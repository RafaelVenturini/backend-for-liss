import {FastifyPluginAsync} from "fastify";
import customerRoutes from "./customer/index.js";

const whTiendanubeRoutes: FastifyPluginAsync = async (app) => {
	app.register(customerRoutes, {prefix: '/customer'})
}

export default whTiendanubeRoutes;