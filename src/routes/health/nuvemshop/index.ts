import {FastifyPluginAsync} from "fastify";
import customerHealthRoutes from "@routes/health/nuvemshop/customer/index.js";

const nuvemshopRoutes: FastifyPluginAsync = async (app) => {
    app.register(customerHealthRoutes, {prefix: '/customer'})
}

export default nuvemshopRoutes;