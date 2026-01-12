import './config.js'
import fastify, {FastifyError} from "fastify";
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
	
	app.setErrorHandler((error: FastifyError, request, reply) => {
		if (error.validation) {
			return reply.status(400).send({
				statusCode: 400,
				error: error.message, // Aqui vem o "tinyId is required"
				details: error.validation // Opcional: mostra qual campo falhou
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