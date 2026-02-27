import {RouteHandlerMethod} from "fastify";

const patchCache: RouteHandlerMethod = async (request, reply) => {
    const links = ["catalogomoda.com.br", "suamoda.online", "catalogofitness.com", "pricefull-lavi-fitness-production.up.railway.app",]
    const cachePath = "/api/server/invalidar-cache"
    for (const link of links) {
        await fetch(link + cachePath)
    }

    return reply.status(204).send({})
}

export default patchCache;