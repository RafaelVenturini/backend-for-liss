import {RouteHandlerMethod} from "fastify";
import {getCustomer} from "@api/tiendanube/customer.js";

const postCustomer: RouteHandlerMethod = async (request, reply) => {
	const {id} = request.body as any
	
	try {
		const data = await getCustomer(id)
		
		if (!data.identification) return reply.status(404).send({
			success: false,
			error: 'Customer has no identification (CPF/CNPJ)'
		})
		if (!data) return reply.status(404).send({
			success: false,
			error: 'Customer not found'
		})
		const insert = {
			cliente_id: data.identification,
			nome: data.name,
			dia_cadastro: data.created_at,
			telefone: data.phone,
			nuvem_id: data.id,
			email: data.email
		}
		await request.server.db.insertFitnessCustomer(insert)
		
		return reply.status(201).send({data})
	} catch (e) {
		return reply.status(500).send({error: e})
	}
}

export default postCustomer;