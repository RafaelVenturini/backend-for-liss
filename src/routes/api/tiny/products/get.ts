import {RouteHandlerMethod} from "fastify";
import {getProduct} from "@api/tiny/product.js";

const getProducts: RouteHandlerMethod = async (request, reply) => {
	try {
		const {id} = request.query as any
		
		if (!id) return reply.status(400).send({error: 'Id is required'})
		if (isNaN(Number(id))) return reply.status(400).send({error: 'Id must be a number'})
		
		const data = await getProduct(id)
		if (data.retorno.erros) {
			return reply.status(400).send({error: data.retorno.erros.map(e => e.erro).join(', ')})
		}
		
		return reply.status(201).send({data})
	} catch (e) {
		return reply.status(500).send({error: e})
	}
}

export default getProducts;