import {FastifyPluginAsync} from "fastify";
import whTiendanubeRoutes from "./tiendanube/index.js";
import whTinyRoutes from "./tiny/index.js";

const webhookRoutes: FastifyPluginAsync = async (app) => {
	app.register(whTiendanubeRoutes, {prefix: '/tiendanube'})
	app.register(whTinyRoutes, {prefix: '/tiny'})
}

export default webhookRoutes;