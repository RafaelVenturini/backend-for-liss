import {FastifyPluginAsync} from "fastify";
import productRoutes from "@routes/api/tiny/products/index.js";

const apiTinyRoutes: FastifyPluginAsync = async (app) => {
	app.register(productRoutes, {prefix: '/products'})
}

export default apiTinyRoutes;