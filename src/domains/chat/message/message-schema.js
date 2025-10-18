import Joi from "joi";

const createMessageSchema = Joi.object({
    content: Joi.string().required().min(5)
        .messages({
            "string.base": "content must be text",
            "string.empty": "content is required",
            "string.min": "content must be at least 5 words."
    }),
    parentId: Joi.number().optional().min(1)
        .message({
            "number.base": "parentId must be number",
            "number.min": "parentId must be at at least 1"
    })
})

const messageSchema = Joi.object({
    id: Joi.number().required().min(1)
        .messages({
            "number.empty": "id messga is required.",
            "number.min": "id message must be at least 1 number."
    })
})

export  {createMessageSchema, messageSchema};