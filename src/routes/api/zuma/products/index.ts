import {FastifyPluginAsync} from "fastify";
import {getProductSchema} from "@routes/api/zuma/schemas.js";
import getProducts from "@routes/api/zuma/products/get.js";

const productsRoute: FastifyPluginAsync = async (app) => {
    app.post("/", {schema: getProductSchema}, getProducts)
}

export default productsRoute