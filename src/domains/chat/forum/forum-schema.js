import Joi from "joi";

const createForumSchema = Joi.object({
    content: Joi.string().required().min(5)
        .messages({
            "string.base": "content must be text",
            "string.empty": "content is required",
            "string.min": "content must be at least 5 words."
    })
})

const forumSchema = Joi.object({
    id: Joi.number().required().min(1)
        .messages({
            "number.empty": "id forum is required.",
            "number.min": "id forum must be at least 1 number."
        })
});

export {createForumSchema, forumSchema};

