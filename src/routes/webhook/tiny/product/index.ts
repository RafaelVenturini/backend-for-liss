import {FastifyPluginAsync} from "fastify";

import postProduct from "./post.js";
import {ProductSchema} from "@routes/webhook/tiny/schema.js";

const productRoutes: FastifyPluginAsync = async (app) => {
	app.post('/', {schema: ProductSchema}, postProduct)
}

export default productRoutes;