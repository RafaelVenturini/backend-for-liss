import {FastifyPluginAsync} from "fastify";
import {PostRefSchema} from "@routes/front-utils/argos/fashion/product-creator/schemas.js";
import postRef from "@routes/front-utils/argos/fashion/product-creator/ref/post.js";

const refRoute: FastifyPluginAsync = async (app) => {
    app.post('', {schema: PostRefSchema}, postRef)
}

export default refRoute;