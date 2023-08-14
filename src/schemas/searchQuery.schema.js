import Joi from "joi";

export const searchQuerySchema = Joi.object({
    query: Joi.string().max(255).required().messages({
        "any.required": "Consulta é obrigatória",
        "string.empty": "Consulta não pode ser vazia.",
        "string.max": "Tamanho máximo para consulta excedido."
    }),
    order: Joi.string().valid('price', 'role', 'date').messages({
        "string.pattern.base": "Formato inválido para ordenação."
    }),
    offset: Joi.string().allow('')
});