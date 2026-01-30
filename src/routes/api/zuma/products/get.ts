import {RouteHandlerMethod} from "fastify";
import {getProduct} from "@api/zuma/get-products.js";

const getProducts: RouteHandlerMethod = async (request, reply) => {
    const {id, date} = request.query as { id: string, date: string }
    const data = await getProduct(id, date)

    const resp = data.length > 0 ? data : [data]


    return reply.status(200).send({data: {len: resp.length, products: resp}});
}

export default getProducts