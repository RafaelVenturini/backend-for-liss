import {RouteHandlerMethod} from "fastify";
import {getCustomerData} from "@/lib/functions/nuvemshop/get-customer-data.js";

const postCustomer: RouteHandlerMethod = async (request, reply) => {
    const {id} = request.body as any;

    try {
        const insert = await getCustomerData(id);
        if (insert.code > 300 || !insert.data)
            return reply.status(insert.code).send({data: {msg: insert.msg}});
        await request.server.db.fitness.customer.insert(insert.data);
        return reply.status(201).send({data: insert.data});
    } catch (e) {
        return reply.status(500).send({error: e});
    }
};

export default postCustomer;
