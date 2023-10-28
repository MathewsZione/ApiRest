const Joi = require ('joi')

const ProdutoSchema = Joi.object({
    quantidade: Joi.number(), 
    usuarios: Joi.array().items({
        nome: Joi.string(),
        preco: Joi.string(),
        descricao: Joi.string(),
        quantidade: Joi.string(),
    })
})
export default ProdutoSchema;