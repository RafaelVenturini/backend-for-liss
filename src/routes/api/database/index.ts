import {FastifyPluginAsync} from "fastify";
import productRoutes from "./product/index.js";
import colorRoutes from "@routes/api/database/color/index.js";

const databaseRoutes: FastifyPluginAsync = async (app) => {
	app.register(productRoutes, {prefix: '/product'})
	app.register(colorRoutes, {prefix: '/color'})
}

export default databaseRoutes;