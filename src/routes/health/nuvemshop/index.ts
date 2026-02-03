import {FastifyPluginAsync} from "fastify";
import customerRoutes from "@routes/health/nuvemshop/customer/index.js";

const nuvemShopRoutes: FastifyPluginAsync = async (app) => {
    app.register(customerRoutes, {prefix: '/customer'})
}

export default nuvemShopRoutes;