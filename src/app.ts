import './config.js'
import fastify, {FastifyError, FastifyReply, FastifyRequest} from "fastify";
import {registerRoutes} from "./routes/index.js";
import database from "@plugins/database.js";
import cron from "@plugins/cron.js"
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import fastifyStatic from "@fastify/static";
import path from "node:path";
import cors from "@fastify/cors";

export function buildApp() {
    const app = fastify({logger: true});
    app.register(cors, {
        origin: ['https://liss-whatsapp-changer.up.railway.app/']
    })

    app.register(swagger, {
        openapi: {
            info: {
                title: "Backliss API",
                version: "1.0.0",
                description: "Backend for liss"
            },
            tags: [
                {name: 'Alterador - Fitness', description: 'Alterações no catálogo fitness'},
                {name: 'Argos - Fashion', description: 'Cadastramento de produtos no Moda'},
                {name: 'Catalogo - Fitness', description: 'Ações para o Catalogo Fitness'},
                {name: 'Database', description: 'Relacionados a alterações no banco de dados'},
                {name: 'Front Utils', description: 'Coisas que podem beneficiar qualquer um dos frontends'},
                {name: 'Health', description: 'Testes para saber da procedencia do funcionamento do backend'},
                {name: 'Tiendanube', description: 'Relacionados à plataforma Nuvemshop'},
                {name: 'Tiny', description: 'Relacionados ao ERP Tiny'},
                {name: 'Zuma ERP', description: 'Relacionados ao ERP Zuma'},
                {name: 'default', description: 'Preguiça imensa'},

            ]
        }
    })


    app.register(swaggerUi, {routePrefix: '/docs'})
    app.register(database)
    app.register(fastifyStatic, {root: path.join(process.cwd(), 'uploads'), prefix: '/img/'})
    app.register(cron)

    app.addHook('onRequest', async (request: FastifyRequest) => {
        request.startDate = new Date()
    })
    app.addHook('onSend', async (request, reply, payload) => {
        request.rawBody = payload;
        return payload;
    });

    app.addHook('onResponse', async (req: FastifyRequest, rep: FastifyReply) => {
        const error = req.executionError || req.rawBody || null;
        await app.db.tool.logs.insert({req, rep, error, pool: app.db.pool.tool});
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