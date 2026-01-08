import {FastifyPluginAsync} from "fastify";
import productRoutes from "./product/index.js";

const databaseRoutes: FastifyPluginAsync = async (app) => {
	app.register(productRoutes, {prefix: '/product'})
}

export default databaseRoutes;