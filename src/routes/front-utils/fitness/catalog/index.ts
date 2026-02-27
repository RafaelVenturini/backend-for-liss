import {FastifyPluginAsync} from "fastify";
import cacheRoutes from "@routes/front-utils/fitness/catalog/cache/index.js";
import changerRoutes from "@routes/front-utils/fitness/catalog/changer/index.js";

const catalogRoutes: FastifyPluginAsync = async (app) => {
    app.register(cacheRoutes, {prefix: '/cache'})
    app.register(changerRoutes, {prefix: '/changer'})
}

export default catalogRoutes;