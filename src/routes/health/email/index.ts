import {FastifyPluginAsync} from "fastify";
import {HealthSchema} from "@routes/health/schema.js";
import getEmailHealth from "@routes/health/email/get.js";

const emailHealthRoutes: FastifyPluginAsync = async (app) => {
    app.get('', {schema: HealthSchema}, getEmailHealth)
}

export default emailHealthRoutes;