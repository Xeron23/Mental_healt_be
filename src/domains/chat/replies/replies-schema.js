import Joi from "joi";

const createRepliesSchema = Joi.object({
    content: Joi.string().required().min(3)
        .messages({
            "string.base": `content should be a type of text`,
            "string.empty": `content cannot be an empty field`,
            "string.min": `content should have a minimum length of 3`,
            "any.required": `content is a required field`
    }),
    postId: Joi.number().required().min(1)
        .messages({
            "number.base": `postId should be a type of number`,
            "number.empty": `postId cannot be an empty field`,
            "number.min": `postId should have a minimum value of 1`,
            "any.required": `postId is a required field`
    }),
});

const repliesSchema = Joi.object({
    id: Joi.number().required().min(1)
        .messages({
            "number.base": `id should be a type of number`,
            "number.empty": `id cannot be an empty field`,
            "number.min": `id should have a minimum value of 1`,
            "any.required": `id is a required field`
    })
});

export  { createRepliesSchema, repliesSchema };