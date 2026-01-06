import {FastifyPluginAsync} from "fastify";
import postCustomer from "./post.js";
import {webhookSchema} from "../schemas.js";

const customerRoutes: FastifyPluginAsync = async (app) => {
	app.post('/', {schema: webhookSchema}, postCustomer)
}

export default customerRoutes;