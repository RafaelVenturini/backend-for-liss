import {FastifyPluginAsync} from "fastify";
import getProduct from "./get.js";
import {
	ProductListSchema,
	ProductSchema
} from "@routes/api/tiny/shemas.js";
import patchProducts from "./patch.js";


const productRoutes: FastifyPluginAsync = async (app) => {
	app.get('/', {schema: ProductSchema}, getProduct)
	app.patch('/', {schema: ProductListSchema}, patchProducts)
}

export default productRoutes;