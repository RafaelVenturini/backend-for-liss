import {RouteHandlerMethod} from "fastify";

const postRef: RouteHandlerMethod = async (request, reply) => {
    try {
        return reply.status(201).send({data: "ok"})
    } catch (e) {
        return reply.status(500).send({error: e})
    }
}

export default postRef;