import {FastifyPluginAsync} from "fastify";
import catalogRoutes from "@routes/front-utils/fitness/catalog/index.js";

const fitnessRoutes: FastifyPluginAsync = async (app) => {
    app.register(catalogRoutes, {prefix: '/catalog'})
}

export default fitnessRoutes;