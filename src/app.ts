import './config.js'
import fastify from "fastify";
import {registerRoutes} from "./routes/index.js";
import database from "@plugins/database.js";

export function buildApp() {
	const app = fastify({logger: true});
	
	app.setErrorHandler((error, request, reply) => {
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
	
	app.register(database)
	registerRoutes(app)
	return app
}