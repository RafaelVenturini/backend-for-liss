import {FastifyPluginAsync} from "fastify";
import productRoutes from "./product/index.js";

const whTinyRoutes: FastifyPluginAsync = async (app) => {
	app.register(productRoutes, {prefix: '/product'})
}

export default whTinyRoutes;