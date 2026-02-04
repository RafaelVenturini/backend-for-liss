import {RouteHandlerMethod} from "fastify";
import {getCustomer} from "@api/tiendanube/customer.js";

const getCustomerHealth: RouteHandlerMethod = async (_, reply) => {
    const data = await getCustomer(251454086)
    if (!data || data.name !== "Ruffus Buffus") reply.status(500).send({})
    else reply.status(200).send({})
}

export default getCustomerHealth
