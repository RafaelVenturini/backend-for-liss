import {FastifyInstance} from "fastify";
import webhookRoutes from "./webhook/index.js";

export async function registerRoutes(app: FastifyInstance) {
	app.register(webhookRoutes, {prefix: '/webhook'})
}