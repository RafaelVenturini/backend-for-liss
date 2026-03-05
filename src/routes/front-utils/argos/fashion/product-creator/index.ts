import {FastifyPluginAsync} from "fastify";
import categorysRoute from "@routes/front-utils/argos/fashion/product-creator/category/index.js";
import printRoute from "@routes/front-utils/argos/fashion/product-creator/print/index.js";
import clothRoute from "@routes/front-utils/argos/fashion/product-creator/cloth/index.js";
import refRoute from "@routes/front-utils/argos/fashion/product-creator/ref/index.js";

const productCreatorRoutes: FastifyPluginAsync = async (app) => {
    app.register(categorysRoute, {prefix: '/category'})
    app.register(printRoute, {prefix: '/print'})
    app.register(clothRoute, {prefix: '/cloth'})
    app.register(refRoute, {prefix: '/ref'})
}

export default productCreatorRoutes;