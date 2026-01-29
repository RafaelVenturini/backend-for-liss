import {FastifyPluginAsync} from "fastify";
import productCreatorRoutes from "@routes/argos/fashion/product-creator/index.js";

const fashionRoutes: FastifyPluginAsync = async (app) => {
    app.register(productCreatorRoutes, {prefix: '/product-creator'})
}

export default fashionRoutes;