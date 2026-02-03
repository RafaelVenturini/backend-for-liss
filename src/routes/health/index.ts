import {FastifyPluginAsync} from "fastify";
import nuvemshopRoutes from "@routes/health/nuvemshop/index.js";
import emailHealthRoutes from "@routes/health/email/index.js";

const healthRoutes: FastifyPluginAsync = async (app) => {
    app.register(nuvemshopRoutes, {prefix: '/nuvemshop'})
    app.register(emailHealthRoutes, {prefix: '/email'})
}

export default healthRoutes;
