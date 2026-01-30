import {FastifyPluginAsync} from "fastify";
import apiTinyRoutes from "@routes/api/tiny/index.js";
import databaseRoutes from "@routes/api/database/index.js";
import apiTiendanubeRoutes from "@routes/api/tiendanube/index.js";
import apiZumaRoutes from "@routes/api/zuma/index.js";

const apiRoutes: FastifyPluginAsync = async (app) => {
    app.register(apiTinyRoutes, {prefix: '/tiny'})
    app.register(databaseRoutes, {prefix: '/database'})
    app.register(apiTiendanubeRoutes, {prefix: '/tiendanube'})
    app.register(apiZumaRoutes, {prefix: '/zuma'})
}

export default apiRoutes;