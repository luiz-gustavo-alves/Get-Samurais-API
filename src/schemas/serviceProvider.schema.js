import Joi from "joi";

export const serviceSchema = Joi.object({
    role: Joi.string().valid('informatica', 'marketing', 'arquitetura', 'financeiro', 'consultoria', 'saude', 'veiculos', 'domestico', 'outros').required().messages({
        "any.required": "Categoria é obrigatória",
        "string.empty": "Categoria não pode ser vazia.",
    }),
    title: Joi.string().max(128).required().messages({
        "any.required": "Título é obrigatório",
        "string.empty": "Título não pode ser vazio.",
        "string.max": "Tamanho máximo para título excedido.",
    }),
    description: Joi.string().max(2048).required().messages({
        "any.required": "Descrição é obrigatória",
        "string.empty": "Descrição não pode ser vazia.",
        "string.max": "Tamanho máximo para descrição excedida.",
    }),
    price: Joi.number().greater(0).max(999999999).required().messages({
        "any.required": "Preço é obrigatório",
        "number.empty": "Preço não pode ser vazio.",
        "number.greater": "Preço é obrigatoriamente positivo e maior que zero.",
        "number.max": "Valor máximo para preço excedido.",
    }),
    image: Joi.string().max(1024).pattern(/\.(jpg|jpeg|png|webp)$/i).required().messages({
        "any.required": "Imagem é obrigatória",
        "string.empty": "Imagem não pode ser vazia.",
        "string.max": "Tamanho máximo para imagem excedida.",
        "string.pattern.base": "Formato inválido para imagem."
    }),
    available: Joi.boolean().required().messages({
        "any.required": "Disponibilidade é obrigatória",
        "boolean.empty": "Disponibilidade não pode ser vazia.",
        "boolean.base": "Disponibilidade com formato inválido"
    })
});