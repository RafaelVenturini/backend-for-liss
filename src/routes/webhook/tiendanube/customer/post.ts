import {RouteHandlerMethod} from "fastify";
import {getCustomer} from "@api/tiendanube/customer.js";
import {databaseDate} from "@/lib/string/date.js";

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
		
		const sql = `
            INSERT INTO cliente(cliente_id,
                                nome,
                                dia_cadastro,
                                telefone,
                                email,
                                nuvem_id)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE nome     = VALUES(nome),
                                    telefone = VALUES(telefone),
                                    email    = VALUES(email)
		`
		const insert = [data.identification, data.name, databaseDate(data.created_at), data.phone, data.email, data.id]
		
		await request.server.db.fitness.execute(sql, insert)
		
		return reply.status(201).send({data})
	} catch (e) {
		return reply.status(500).send({error: e})
	}
}

export default postCustomer;