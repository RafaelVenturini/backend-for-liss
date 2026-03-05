import {RouteHandlerMethod} from "fastify";
import {invalidateFitness} from "@/lib/util/cache/invalidate-fitness.js";

interface Body {
    whatsapp: boolean
}

const patchCache: RouteHandlerMethod = async (request, reply) => {
    const {whatsapp} = request.body as Body
    await invalidateFitness(whatsapp)

    return reply.status(204).send()
}

export default patchCache;