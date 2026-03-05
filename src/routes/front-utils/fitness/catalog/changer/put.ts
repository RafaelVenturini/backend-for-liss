import {RouteHandlerMethod} from "fastify";
import {getProduct} from "@api/tiny/product.js";

interface Body {
    id: number
}

const putChanger: RouteHandlerMethod = async (request, reply) => {
    const {id} = request.body as Body;

    const result = await request.server.db.fitness.product.selectTinyId(id)
    const tinyId = result[0].tiny_id

    const data = await getProduct(tinyId)
    if (data.retorno.erros) return reply.status(400).send({error: data.retorno.erros[0].erro})
    const err = await reply.server.db.fitness.product.insert(data.retorno.produto)


    if (err) {
        console.error(err)
        return reply.status(400).send({error: err})
    }
    reply.code(200).send({product: data.retorno.produto})
};

export default putChanger;
