import {FastifyInstance} from "fastify";
import webhookRoutes from "./webhook/index.js";
import apiRoutes from "@routes/api/index.js";
import testRoutes from "@routes/test/index.js";
import frontUtilsRoutes from "@routes/front-utils/index.js";
import argosRoutes from "@routes/argos/index.js";
import healthRoutes from "@routes/health/index.js";

export async function registerRoutes(app: FastifyInstance) {
    app.register(frontUtilsRoutes, {prefix: '/front-utils'})
    app.register(webhookRoutes, {prefix: '/webhook'})
    app.register(healthRoutes, {prefix: '/health'})
    app.register(argosRoutes, {prefix: '/argos'})
    app.register(testRoutes, {prefix: '/test'})
    app.register(apiRoutes, {prefix: '/api'})

    app.get('/', async (request, reply) => {
        return {
            server: 'alive',
            endpoint: request.url,
            method: request.method,
            status: reply.statusCode,
            duration: reply.elapsedTime,
            body: JSON.stringify(request.body) || null,
            timestamp: new Date(),
        }
    })
}