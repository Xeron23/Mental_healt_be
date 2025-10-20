import Joi from "joi";

const meditateQueueSchema = Joi.object({
    meditationId: Joi.number().required().min(1)
                .messages({
                "number.empty": "Meditate id is required.",
                "number.min": "Meditate id must be at least 1 number."
        })
});


export {meditateQueueSchema};