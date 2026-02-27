import {FastifyPluginAsync} from "fastify";
import getChanger from "@routes/front-utils/fitness/catalog/changer/get.js";
import {GetFitChangerSchema} from "@routes/front-utils/fitness/catalog/schema.js";

const changerRoutes: FastifyPluginAsync = async (app) => {
    app.get("/", {schema: GetFitChangerSchema}, getChanger)
}

export default changerRoutes;