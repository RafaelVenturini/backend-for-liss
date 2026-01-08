import {FastifyPluginAsync} from "fastify";
import apiTinyRoutes from "@routes/api/tiny/index.js";

const apiRoutes: FastifyPluginAsync = async (app) => {
	app.register(apiTinyRoutes, {prefix: '/tiny'})
}

export default apiRoutes;