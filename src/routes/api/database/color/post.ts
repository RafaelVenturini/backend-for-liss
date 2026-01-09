import {RouteHandlerMethod} from "fastify";
import {createNewColor} from "@api/database/color.js";

const postColor: RouteHandlerMethod = async (request, reply) => {
	const {name, sku} = request.body as any
	const data = await createNewColor(name, sku, request.server.db)
	
	if (data.error) {
		if (data.error === 'Color already exists') {
			return reply.status(409).send({error: data.error})
		} else return reply.status(400).send({error: data.error})
	}
	return reply.status(201).send({data: "Color created successfully"})
}

export default postColor;