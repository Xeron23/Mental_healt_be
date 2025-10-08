import Joi from "joi";

const videoSchema = Joi.object({
    id : Joi.number().required().min(1)
        .messages({
            "number.empty": "Id video is required.",
            "number.min": "Id video must be at least 1 number."
    }),
})

const getAllVideoSchema = Joi.object({
    limit: Joi.number().optional().min(1).max(100)
        .messages({
            "number.base": "Limit must be a number.",
            "number.min": "Limit must be at least 1.",
            "number.max": "Limit must be at most 100."
    }),
    page: Joi.number().optional().min(1)
        .messages({
            "number.base": "Page must be a number.",
            "number.min": "Page must be at least 1."
    }),
});

export {videoSchema, getAllVideoSchema};