import {FastifyPluginAsync} from "fastify";
import apiTinyRoutes from "@routes/api/tiny/index.js";
import databaseRoutes from "@routes/api/database/index.js";

const apiRoutes: FastifyPluginAsync = async (app) => {
	app.register(apiTinyRoutes, {prefix: '/tiny'})
	app.register(databaseRoutes, {prefix: '/database'})
}

export default apiRoutes;