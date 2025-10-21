import Joi from "joi";

const userMeditateSchema = Joi.object({
    meditateId: Joi.number().required().min(1)
            .messages({
            "number.empty": "Meditate id is required.",
            "number.min": "Meditate id must be at least 1 number."
    })
});

const getAllMeditateSchema = Joi.object({
    page: Joi.number().min(1)
        .messages({
            "number.min": "Page must be at least 1."
        }),
    limit: Joi.number().min(1).max(100)
        .messages({
            "number.min": "Limit must be at least 1.",
            "number.max": "Limit must be at most 100."
        }),
    type: Joi.string().optional().valid('alam', 'meditasi')
        .messages({
            'string.base': 'mood harus berupa teks.',
            "any.only": `Status must be "sad","joy","anger","fear" `
    }),
    search: Joi.string().optional()
        .messages({
            'string.base': 'Search harus berupa text',
    }),
});

export {userMeditateSchema, getAllMeditateSchema};