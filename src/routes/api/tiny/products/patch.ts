import {RouteHandlerMethod} from "fastify";
import {getProductsByDate} from "@api/tiny/product.js";

const getProducts: RouteHandlerMethod = async (request, reply) => {
	try {
		const {date} = request.body as any
		if (!date) return reply.status(400).send({error: 'Date is required'})
		if (typeof date !== 'string') return reply.status(400).send({error: 'Date must be a string'})
		
		const data = await getProductsByDate(date)
		
		return reply.status(201).send({data})
	} catch (e) {
		return reply.status(500).send({error: e})
	}
}

export default getProducts;