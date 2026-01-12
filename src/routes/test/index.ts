import {FastifyPluginAsync} from "fastify";
import postTest from "@routes/test/post.js";

const testRoutes: FastifyPluginAsync = async (app) => {
	app.post('/', postTest)
}

export default testRoutes;