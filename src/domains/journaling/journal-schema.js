import Joi from "joi";

const journalSchema = Joi.object({
    id: Joi.number().required().min(1)
        .messages({
            "number.empty": "Id face is required.",
            "number.min": "Id face must be at least 1 number."
        })
});

const createJournalSchema = Joi.object({
    title: Joi.string().required()
        .messages({
            'string.empty': "title journal is required",
            'string.base': 'title must be teks',
        }),
    content: Joi.string().required()
        .messages({
            'string.empty': "Content journal is required",
            'string.base': 'Content must be teks',
    }),
});


const updateJournaslSchema = Joi.object({
    title: Joi.string().optional()
        .messages({
            'string.base': 'title must be teks',
    }),
    content: Joi.string().optional()
        .messages({
            'string.base': 'Content must be teks',
    }),
});

const getAllJournalSchema = Joi.object({
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

export {journalSchema, createJournalSchema, getAllJournalSchema, updateJournaslSchema};