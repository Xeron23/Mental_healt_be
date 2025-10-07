import Joi from "joi";

const faceSchema = Joi.object({
    id : Joi.number().required().min(1)
        .messages({
            "number.empty": "Id face is required.",
            "number.min": "Id face must be at least 1 number."
    }),
});

const getAllFaceSchema = Joi.object({
    mood: Joi.string().optional()
        .valid("HAPPY","SAD","ANGRY","SURPRISED","NEUTRAL","FEARFUL")
        .messages({
            'string.base': 'mood harus berupa teks.',
            "any.only": `Status must be "HAPPY" "SAD" "ANGRY" "SURPRISED" "NEUTRAL" "FEARFUL" `
    }),
    week: Joi.boolean().optional()
        .messages({
            'boolean.base': 'week harus berupa boolean',
    }),
    month: Joi.boolean().optional()
        .messages({
            'boolean.base': 'month harus berupa boolean',
    }),
});

export {faceSchema, getAllFaceSchema};
