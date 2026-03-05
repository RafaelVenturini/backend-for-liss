import {FastifyPluginAsync} from "fastify";
import printRoutes from "@routes/front-utils/print/index.js";
import argosRoutes from "@routes/front-utils/argos/index.js";
import fitnessRoutes from "@routes/front-utils/fitness/index.js";

const frontUtilsRoutes: FastifyPluginAsync = async (app) => {
    app.register(printRoutes, {prefix: '/print'})
    app.register(argosRoutes, {prefix: '/argos'})
    app.register(fitnessRoutes, {prefix: '/fitness'})
}

export default frontUtilsRoutes;