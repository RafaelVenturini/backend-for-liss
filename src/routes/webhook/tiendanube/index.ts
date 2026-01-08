import {FastifyPluginAsync} from "fastify";
import customerRoutes from "./customer/index.js";
import orderRoutes from "@routes/webhook/tiendanube/order/index.js";

const whTiendanubeRoutes: FastifyPluginAsync = async (app) => {
	app.register(customerRoutes, {prefix: '/customer'})
	app.register(orderRoutes, {prefix: '/order'})
}

export default whTiendanubeRoutes;