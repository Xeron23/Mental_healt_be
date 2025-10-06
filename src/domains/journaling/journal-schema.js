import Joi from "joi";

const journalSchema = Joi.object({
    id: Joi.number().required().min(1)
        .messages({
            "number.empty": "Id face is required.",
            "number.min": "Id face must be at least 1 number."
        })
});

const createJournalSchema = Joi.object({
    userId: Joi.number().required().min(1)
        .messages({
            "number.empty": "Id user is required.",
            "number.min": "Id face must be at least 1 number."
    }),
    title: Joi.string().required()
        .message({
            'string.empty': "title journal is required",
            'string.base': 'title must be teks',
        }),
    content: Joi.string().required()
        .message({
            'string.empty': "Content journal is required",
            'string.base': 'Content must be teks',
    }),
});


const updateJournaslSchema = Joi.object({
    title: Joi.string().optional()
        .message({
            'string.base': 'title must be teks',
    }),
    content: Joi.string().optional()
        .message({
            'string.base': 'Content must be teks',
    }),
});

export {journalSchema, createJournalSchema, updateJournaslSchema};