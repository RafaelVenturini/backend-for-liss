import {FastifyPluginAsync} from "fastify";
import nuvemShopRoutes from "@routes/health/nuvemshop/index.js";
import emailRoutes from "@routes/health/email/index.js";

const healthRoutes: FastifyPluginAsync = async (app) => {
    app.register(nuvemShopRoutes, {prefix: '/nuvemshop'})
    app.register(emailRoutes, {prefix: '/email'})
}

export default healthRoutes;