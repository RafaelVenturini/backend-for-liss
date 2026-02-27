import {RouteHandlerMethod} from "fastify";

const postTest: RouteHandlerMethod = async (request, reply) => {
    console.log(await request.server.db.fashion.product.selectLastPrint('E'))
}

export default postTest;