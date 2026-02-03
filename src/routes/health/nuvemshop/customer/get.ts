import {RouteHandlerMethod} from "fastify";
import {getCustomer} from "@api/tiendanube/customer.js";

const getCustomerHealth: RouteHandlerMethod = async (request, reply) => {
    const data = await getCustomer(251454086)

    if (data.name === "Ruffus Buffus") return reply.status(204).send({})
    return reply.status(500).send({})
}

export default getCustomerHealth