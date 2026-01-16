import {FastifyPluginAsync} from "fastify";
import printRoutes from "@routes/front-utils/print/index.js";

const frontUtilsRoutes: FastifyPluginAsync = async (app) => {
	app.register(printRoutes, {prefix: '/print'})
}

export default frontUtilsRoutes;