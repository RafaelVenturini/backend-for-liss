import {RouteHandlerMethod} from "fastify";

interface PostBody {
    ref: string;
    name: string;
    category: string;
    price: number;
}

const postRef: RouteHandlerMethod = async (request, reply) => {
    try {
        const {ref, name, category, price,} = request.body as PostBody;
        const insert = {sku: `${ref}-${category}`, ref, name, price, category};

        const response = await request.server.db.fashion.insertReference(insert)
        if (!response) return reply.status(201).send({data: insert})
        return reply.status(500).send({error: JSON.stringify({response, insert}),})

    } catch (e) {
        return reply.status(500).send({error: e})
    }
}

export default postRef;