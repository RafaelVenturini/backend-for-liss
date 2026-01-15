import './config.js'
import fastify, {
	FastifyError,
	FastifyReply,
	FastifyRequest
} from "fastify";
import {registerRoutes} from "./routes/index.js";
import database from "@plugins/database.js";
import mailerPlugin from "@plugins/mailer.js";
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'


export function buildApp() {
	const app = fastify({logger: true});
	
	app.register(swagger, {
		openapi: {
			info: {
				title: "Backliss API",
				version: "1.0.0",
				description: "Backend for liss"
			},
			tags: [
				{
					name: 'Database',
					description: 'Relacionados a alterações no banco de dados'
				},
				{name: 'Tiny', description: 'Relacionados ao ERP Tiny'},
				{
					name: 'Tiendanube',
					description: 'Relacionados à plataforma Nuvemshop'
				},
				{
					name: 'Zuma ERP',
					description: 'Relacionados ao ERP Zuma'
				},
			]
		}
	})
	
	app.register(swaggerUi, {routePrefix: '/docs'})
	app.register(database)
	app.register(mailerPlugin)
	
	app.addHook('onRequest', async (request: FastifyRequest) => {
		request.startDate = new Date()
	})
	app.addHook('onSend', async (request, reply, payload) => {
		request.rawBody = payload;
		return payload;
	});
	
	app.addHook('onResponse', async (request: FastifyRequest, reply: FastifyReply) => {
		const error = request.executionError || request.rawBody || null;
		await app.db.insertLog(request, reply, error);
	});
	
	app.setErrorHandler(async (error: FastifyError, request, reply) => {
		request.executionError = error;
		
		if (error.validation) {
			return reply.status(400).send({
				statusCode: 400,
				error: error.message,
			});
		}
		
		if (error.statusCode && error.statusCode < 500) {
			return reply.status(error.statusCode).send({
				statusCode: error.statusCode,
				error: error.message
			});
		}
		
		request.log.error({
			msg: "Error catched in global error handler",
			error: error,
			payload: request.body
		})
		
		reply.status(500).send({
			error: 'Internal Server Error',
			msg: error
		})
	})
	
	registerRoutes(app)
	return app
}