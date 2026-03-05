import {FastifyPluginAsync} from "fastify";
import {DefaultSchema, PostPrintSchema} from "@routes/front-utils/argos/fashion/product-creator/schemas.js";
import getPrint from "@routes/front-utils/argos/fashion/product-creator/print/get.js";
import postPrint from "@routes/front-utils/argos/fashion/product-creator/print/post.js";

const printRoute: FastifyPluginAsync = async (app) => {
    app.get('', {schema: DefaultSchema}, getPrint)
    app.post('', {schema: PostPrintSchema}, postPrint);
}

export default printRoute;