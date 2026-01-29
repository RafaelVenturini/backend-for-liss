import {RouteHandlerMethod} from "fastify";

const getCloth: RouteHandlerMethod = async (request, reply) => {
    try {
        const data = await request.server.db.fashion.selectReactCloths()
        return reply.status(200).send({data})
    } catch (e) {
        return reply.status(500).send({error: e})
    }
};

export default getCloth;
