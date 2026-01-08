import {FastifyPluginAsync} from "fastify";
import postOrder from "./post.js";
import {webhookSchema} from "../schemas.js";

const orderRoutes: FastifyPluginAsync = async (app) => {
	app.post('/', {schema: webhookSchema}, postOrder)
}

export default orderRoutes;