import {FastifyPluginAsync} from "fastify";
import {
	GetProductSchema,
	PatchProductSchema,
	PostProductSchema
} from "@routes/api/database/schemas.js";
import getProducts from "@routes/api/database/product/get.js";
import postProduct from "@routes/api/database/product/post.js";
import patchProduct from "@routes/api/database/product/patch.js";

const productRoutes: FastifyPluginAsync = async (app) => {
	app.post('/', {schema: PostProductSchema}, postProduct)
	app.get('/', {schema: GetProductSchema}, getProducts)
	app.patch('/', {schema: PatchProductSchema}, patchProduct)
}

export default productRoutes;