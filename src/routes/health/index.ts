import {FastifyPluginAsync} from "fastify";
import nuvemShopRoutes from "@routes/health/nuvemshop/index.js";

const healthRoutes: FastifyPluginAsync = async (app) => {
    app.register(nuvemShopRoutes, {prefix: '/nuvemshop'})
}

export default healthRoutes;