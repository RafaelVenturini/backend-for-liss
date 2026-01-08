import {FastifyInstance} from "fastify";
import webhookRoutes from "./webhook/index.js";
import apiRoutes from "@routes/api/index.js";

export async function registerRoutes(app: FastifyInstance) {
	app.register(webhookRoutes, {prefix: '/webhook'})
	app.register(apiRoutes, {prefix: '/api'})
	
	app.get('/', async () => {
		return {server: 'alive'}
	})
}