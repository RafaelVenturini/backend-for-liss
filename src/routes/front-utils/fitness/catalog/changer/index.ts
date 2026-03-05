import {FastifyPluginAsync} from "fastify";
import getChanger from "@routes/front-utils/fitness/catalog/changer/get.js";
import {
    GetFitChangerSchema,
    PatchFitChangerSchema,
    PutFitChangerSchema
} from "@routes/front-utils/fitness/catalog/changer/schema.js";
import patchChanger from "@routes/front-utils/fitness/catalog/changer/patch.js";
import putChanger from "@routes/front-utils/fitness/catalog/changer/put.js";

const changerRoutes: FastifyPluginAsync = async (app) => {
    app.get("/", {schema: GetFitChangerSchema}, getChanger)
    app.patch("/", {schema: PatchFitChangerSchema}, patchChanger)
    app.put('/', {schema: PutFitChangerSchema}, putChanger)
}

export default changerRoutes;