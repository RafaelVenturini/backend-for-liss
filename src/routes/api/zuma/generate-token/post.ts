import {RouteHandlerMethod} from "fastify";
import {generateToken} from "@api/zuma/generate-token.js";


const postGenerateToken: RouteHandlerMethod = async (request, reply) => {
    const {code, text} = await generateToken()

    return reply.status(code).send(text)
}

export default postGenerateToken