import {FastifyPluginAsync} from "fastify";
import postGenerateToken from "@routes/api/zuma/generate-token/post.js";
import {generateTokenSchema} from "@routes/api/zuma/schemas.js";

const generateTokenRoute: FastifyPluginAsync = async (app) => {
    app.post("/", {schema: generateTokenSchema}, postGenerateToken)
}

export default generateTokenRoute