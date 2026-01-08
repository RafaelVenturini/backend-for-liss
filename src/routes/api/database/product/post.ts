import {RouteHandlerMethod} from "fastify";
import {getProduct} from "@api/tiny/product.js";

const postProduct: RouteHandlerMethod = async (request, reply) => {
	try {
		const {tinyId} = request.body as any;
		
		const data = await getProduct(tinyId)
		if (!data) return reply.status(404).send({error: 'Product not found'})
		if (data.retorno.erros) return reply.status(400).send({error: data.retorno.erros.map(e => e.erro).join(', ')})
		
		reply.server.db.insertFitnessProduct(data.retorno.produto)
		
		return reply.status(201).send({data: data.retorno.produto})
	} catch (e) {
		return reply.status(500).send({error: e})
	}
}

export default postProduct;