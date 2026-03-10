import './config.js'
import fastify from "fastify";
import {registerRoutes} from "./routes/index.js";
import database from "@plugins/database.js";
import cron from "@plugins/cron.js"
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import fastifyStatic from "@fastify/static";
import cors from "@fastify/cors";
import {swaggerOpts, swaggerUiOpts} from "@/lib/app-build/swagger.js";
import {corsOpts} from "@/lib/app-build/cors.js";
import {fastifyStaticOpts} from "@/lib/app-build/fastify.js";
import {registerHooks} from "@/lib/app-build/hooks.js";
import {registerErrorHandler} from "@/lib/app-build/error-handler.js";

export function buildApp() {
    const app = fastify({logger: true});
    app.register(cors, corsOpts)
    app.register(swagger, swaggerOpts)
    app.register(swaggerUi, swaggerUiOpts)
    app.register(database)
    app.register(fastifyStatic, fastifyStaticOpts)
    app.register(cron)

    registerHooks(app)
    registerErrorHandler(app);
    registerRoutes(app)
    return app
}