import {FastifyPluginAsync} from "fastify";
import getPrint from "@routes/front-utils/print/get.js";
import {PrintSchema} from "@routes/front-utils/schema.js";

const printRoutes: FastifyPluginAsync = async (app) => {
	app.get('', {schema: PrintSchema}, getPrint)
}

export default printRoutes;