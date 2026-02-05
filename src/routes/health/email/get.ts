import {RouteHandlerMethod} from "fastify";

const getEmailHealth: RouteHandlerMethod = async (response, reply) => {
    const data = response.server.mailer.status
    reply.status(200).send({data})
}

export default getEmailHealth
