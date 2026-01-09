import {FastifyPluginAsync} from "fastify";
import postColor from "@routes/api/database/color/post.js";
import {PostColorSchema} from "@routes/api/database/schemas.js";

const colorRoutes: FastifyPluginAsync = async (app) => {
	app.post('/', {schema: PostColorSchema}, postColor)
}

export default colorRoutes;