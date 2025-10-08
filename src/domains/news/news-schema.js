import Joi from "joi";


const newsSchema = Joi.object({
    newsId: Joi.number().required().min(1)
            .messages({
            "number.empty": "News id is required.",
            "number.min": "News id must be at least 1 number."
    })
});

export default newsSchema;