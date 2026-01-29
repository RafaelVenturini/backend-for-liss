import {FastifyPluginAsync} from "fastify";
import {DefaultSchema} from "@routes/argos/fashion/product-creator/schemas.js";
import getCloth from "@routes/argos/fashion/product-creator/cloth/get.js";

const clothRoute: FastifyPluginAsync = async (app) => {
    app.get('', {schema: DefaultSchema}, getCloth)
}

export default clothRoute;