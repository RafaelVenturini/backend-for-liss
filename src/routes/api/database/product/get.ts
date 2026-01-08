import {RouteHandlerMethod} from "fastify";

const getProducts: RouteHandlerMethod = async (request, reply) => {
	// @ts-ignore
	if (Object.keys(request.query).length === 0) {
		return reply.status(400).send({error: 'At least one query parameter is required'});
	}
	const {tinyId, sku} = request.query as any
	try {
		const data = await request.server.db.selectFitnessProduct(tinyId, sku)
		return reply.status(200).send({data})
	} catch (e) {
		return reply.status(500).send({error: e})
	}
	
}

export default getProducts;