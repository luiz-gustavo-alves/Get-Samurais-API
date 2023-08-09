import Joi from "joi";

export const userSignUpSchema = Joi.object({
    name: Joi.string().max(64).required().messages({
        "any.required": "Nome é obrigatório",
        "string.empty": "Nome não pode ser vazio.",
        "string.max": "Tamanho máximo para nome excedido.",
    }),
    email: Joi.string().email().max(128).required().messages({
        "any.required": "Email é obrigatório",
        "string.empty": "Email não pode ser vazio.",
        "string.email": "Email com formato inválido.",
        "string.max": "Tamanho máximo para email excedido."
    }),
    password: Joi.string().max(512).required().messages({
        "any.required": "Senha é obrigatória",
        "string.empty": "Senha não pode ser vazia.",
        "string.max": "Tamanho máximo para senha excedida.",
    })
});

export const serviceProviderSignUpSchema = Joi.object({
    name: Joi.string().max(64).required().messages({
        "any.required": "Nome é obrigatório",
        "string.empty": "Nome não pode ser vazio.",
        "string.max": "Tamanho máximo para nome excedido.",
    }),
    email: Joi.string().email().max(128).required().messages({
        "any.required": "Email é obrigatório",
        "string.empty": "Email não pode ser vazio.",
        "string.email": "Email com formato inválido.",
        "string.max": "Tamanho máximo para email excedido."
    }),
    password: Joi.string().max(512).required().messages({
        "any.required": "Senha é obrigatória",
        "string.empty": "Senha não pode ser vazia.",
        "string.max": "Tamanho máximo para senha excedida.",
    }),
    cellphoneNumber: Joi.string().length(11).pattern(/^[0-9]+$/).required().messages({
        "any.required": "Número de celular é obrigatório",
        "string.empty": "Número de celular não pode ser vazio.",
        "string.length": "Número de celular inválido.",
        "string.pattern.base": "Número de celular com formato inválido.",
    }),
    CEP: Joi.string().length(8).pattern(/^[0-9]+$/).required().messages({
        "any.required": "CEP é obrigatório",
        "string.empty": "CEP não pode ser vazio.",
        "string.length": "CEP com formato inválido.",
        "string.pattern.base": "CEP com formato inválido.",
    }),
    city: Joi.string().max(255).required().messages({
        "any.required": "Cidade é obrigatória",
        "string.empty": "Cidade não pode ser vazia.",
        "string.max": "Tamanho máximo para cidade excedida.",
    }),
    UF: Joi.string().length(2).valid('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO','RR', 'SC', 'SP', 'SE', 'TO').required().messages({
        "any.required": "UF é obrigatório",
        "string.empty": "UF não pode ser vazio.",
        "string.length": "UF inválido.",
        "string.pattern.base": "UF com formato inválido.",
    }),
    address: Joi.string().max(255).required().messages({
        "any.required": "Endereço é obrigatório",
        "string.empty": "Endereço não pode ser vazio.",
        "string.max": "Tamanho máximo para endereço excedido.",
    }),
    complement: Joi.string().max(255).allow('').required().messages({
        "any.required": "Complemento é obrigatório",
        "string.max": "Tamanho máximo para complemento excedido.",
    })
});

export const signInSchema = Joi.object({
    email: Joi.string().email().max(128).required().messages({
        "any.required": "Email é obrigatório",
        "string.empty": "Email não pode ser vazio.",
        "string.email": "Email com formato inválido.",
        "string.max": "Tamanho máximo para email excedido."
    }),
    password: Joi.string().max(512).required().messages({
        "any.required": "Senha é obrigatória",
        "string.empty": "Senha não pode ser vazia.",
        "string.max": "Tamanho máximo para senha excedida.",
    })
});

export const logoutSchema = Joi.object({
    type: Joi.string().valid('userSession', 'serviceProviderSession').required().messages({
        "any.required": "Tipo de sessão é obrigatória",
        "string.empty": "Tipo de sessão não pode ser vazia.",
        "string.pattern.base": "Formato inválido para tipo de sessão.",
    })
});