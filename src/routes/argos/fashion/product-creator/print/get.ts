import {RouteHandlerMethod} from "fastify";

const getPrint: RouteHandlerMethod = async (request, reply) => {
    try {
        const data = await request.server.db.fashion.selectReactPrint()
        return reply.status(200).send({data})
    } catch (e) {
        return reply.status(500).send({error: e})
    }
};

export default getPrint;
