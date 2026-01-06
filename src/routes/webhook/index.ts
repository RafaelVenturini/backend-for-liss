import {FastifyPluginAsync} from "fastify";
import whTiendanubeRoutes from "./tiendanube/index.js";

const webhookRoutes: FastifyPluginAsync = async (app) => {
	app.register(whTiendanubeRoutes, {prefix: '/tiendanube'})
}

export default webhookRoutes;