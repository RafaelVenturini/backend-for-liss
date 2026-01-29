import {FastifyPluginAsync} from "fastify";
import getCategorys from "@routes/argos/fashion/product-creator/category/get.js";
import {DefaultSchema} from "@routes/argos/fashion/product-creator/schemas.js";

const categorysRoute: FastifyPluginAsync = async (app) => {
    app.get('', {schema: DefaultSchema}, getCategorys)
}

export default categorysRoute;