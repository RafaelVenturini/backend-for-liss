import {FastifyPluginAsync} from "fastify";
import generateTokenRoute from "@routes/api/zuma/generate-token/index.js";
import productsRoute from "@routes/api/zuma/products/index.js";

const apiZumaRoutes: FastifyPluginAsync = async (app) => {
    app.register(generateTokenRoute, {prefix: '/generate-token'});
    app.register(productsRoute, {prefix: '/products'});
}

export default apiZumaRoutes;