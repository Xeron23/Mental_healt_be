import BaseError from "../../base_classes/base-error.js";
import { generateVerifEmail } from "../../utils/bodyEmail.js";
import sendEmail from "../../utils/sendEmail.js";
import { parseJWT, generateToken } from "../../utils/jwtTokenConfig.js";
import joi from "joi";
import prisma from "../../config/db.js";
import bcrypt from "bcrypt";
import { hashPassword, matchPassword } from "../../utils/passwordConfig.js";


class AuthService {
    async login(username, password) {
        let user = await prisma.user.find({
            where: {
                username: username
            }
        });

        if (!user) {
            user = await prisma.user.findUnique({
                where: {
                    email: username
                }
            });

            if (!user) {
                throw BaseError.badRequest("Invalid credentials");
            }
        }

        const isMatch = await matchPassword(password, user.password);

        if (!isMatch) {
            throw BaseError.badRequest("Invalid credentials");
        }

        if (!user.verifiedAt){
            const token = generateToken(user.user_id, "5m");
            const verificationLink = `${process.env.BE_URL}/api/v1/auth/verify/${token}`;
            const emailHtml = generateVerifEmail(verificationLink);

            sendEmail(
                user.email,
                "Verifikasi Email dari Test: Test Channel",
                "Terima kasih telah mendaftar di Test: Test Channel! Untuk melanjutkan, silakan verifikasi email Anda dengan mengklik tautan berikut:",
                emailHtml
            );

            throw BaseError.badRequest("Email not verified, Please check your email to verify your account.");
        }

        const accessToken = generateToken(user.id, "1d");
        const refreshToken = generateToken(user.id, "365d");

        return { access_token: accessToken, refresh_token: refreshToken };
    }

    async register(data) {

        const usernameExist = await prisma.user.findUnique({
            where: {
                username: data.username
            }
        });

        const emailExist = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (usernameExist || emailExist) {
            let validation = "";
            let stack = [];

            if (usernameExist) {
                validation = "Username already taken.";

                stack.push({
                    message: "Username already taken.",
                    path: ["username"]
                });
            }

            if (emailExist) {
                validation += "Email already taken.";

                stack.push({
                    message: "Email already taken.",
                    path: ["email"]
                });
            }
            throw new joi.ValidationError(validation, stack);
            
        }

        data.password = await hashPassword(data.password);
        
        const createdUser = await prisma.user.create({
            data: data
        });

        if (!createdUser) {
            throw Error("Failed to register");
        }

        const token = generateToken(createdUser.user_id, "5m");
        const verificationLink = `${process.env.BE_URL}/api/v1/auth/verify/${token}`;
        console.log("link: ",verificationLink);
        
        const emailHtml = generateVerifEmail(verificationLink);

        sendEmail(
                createdUser.email,
                "Verifikasi Email dari Test: Test Channel",
                "Terima kasih telah mendaftar di Test: Test Channel! Untuk melanjutkan, silakan verifikasi email Anda dengan mengklik tautan berikut:",
                emailHtml
        );

        return {message: "User registered successfully. Please check your email to verify your account."};
    }

    async verify(token) {
        const decoded = parseJWT(token);
        
        if (!decoded) {
            return { status: 400, message: "Invalid token" };
        }
        console.log(decoded.id);
        

        const user = await  prisma.user.findUnique({
            where: {
                user_id: decoded.id
            }
        });

        if (!user) {
            return { status: 400, message: "User Not Found" }
        }

        if (user.verifiedAt){
            return { status: 400, message: "Email already verified" };
        }

        await prisma.user.update({
            where: {
                user_id: user.user_id
            },
            data: {
                verifiedAt: new Date()
            }
        });

        return { status: 200, message: "Email verified successfully" };
    }

    async getProfile(id) {
        const user = await prisma.user.findUnique({
            where: {
                user_id: id
            },
            select: {
                password: 0
            }
        });

        if (!user) {
            throw BaseError.notFound("User not found");
        }

        return user;
    }

    async updateProfile(id, data) {
        const user = await prisma.user.findUnique({
            where: {
                user_id: id
            }
        });

        if (!user) {
            throw BaseError.notFound("User not found");
        }

        const updatedUser = await prisma.user.update({
            where: {
                user_id: id
            },
            data: data
        });

        return updatedUser;
    }

    async updatePasswordProfile(id, oldPassword, newPassword) {
        const user = await User.findById(id);

        if (!user) {
            throw BaseError.notFound("User not found");
        }

        const isMatch = await matchPassword(oldPassword, user.password);

        if (!isMatch) {
            throw new joi.ValidationError("Wrong Password", [{'message': 'Wrong Password', 'path': ['old_password']}]);
        }

        if (oldPassword === newPassword) {
            throw new joi.ValidationError("New password cannot be the same as the old password", [{'message': 'New password cannot be the same as the old password', 'path': ['new_password']}]);
        }

        user.password = await hashPassword(newPassword);
        await prisma.user.update({
            where: {
                user_id: id
            },
            data: {
                password: user.password
            }
        })

        return { message: "Password updated successfully" };
    }
    
    async refreshToken(token) {
        const decoded = parseJWT(token);

        if (!decoded) {
            throw BaseError.unauthorized("Invalid token");
        }

        const user = await prisma.user.findUnique({
            where: {
                user_id: decoded._id
            }
        });

        if (!user) {
            throw BaseError.notFound("User not found");
        }

        const accessToken = generateToken(user.user_id, "1d");

        return accessToken;
    }
}

export default new AuthService();