import {RouteHandlerMethod} from "fastify";

const postTest: RouteHandlerMethod = async (request, reply) => {
	const text = 'deleted'
	try {
		const data = await request.server.mailer.send(
			`${text}-coupon`,
			`Teste Nodemailer ${text}`,
			'rafaelventurinidipalma@gmail.com',
			{
				discount: 69,
				coupon: 'OMG ITS COUPON',
				vality: "Manhã!"
			})
		return reply.status(201).send({data})
	} catch (e) {
		return reply.status(500).send({error: e})
	}
}

export default postTest;