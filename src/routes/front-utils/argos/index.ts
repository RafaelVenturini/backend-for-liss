import {FastifyPluginAsync} from "fastify";
import fashionRoutes from "@routes/front-utils/argos/fashion/index.js";

const argosRoutes: FastifyPluginAsync = async (app) => {
    app.register(fashionRoutes, {prefix: '/fashion'})
}

export default argosRoutes;