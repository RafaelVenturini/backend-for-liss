import {RouteHandlerMethod} from "fastify";

const getEmailHealth: RouteHandlerMethod = async (response, reply) => {
    const data = null
    reply.status(200).send({data})
}

export default getEmailHealth
