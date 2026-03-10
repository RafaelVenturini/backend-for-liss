import {RouteHandlerMethod} from "fastify";
import {getOrder} from "@api/tiendanube/order.js";
import {arrangeOrder} from "@api/tiendanube/arrange-order.js";
import {createRepositionUser, removeRepositionUser} from "@api/tiendanube/reposition.js";


const postOrder: RouteHandlerMethod = async (request, reply) => {
    const {id, event} = request.body as any

    try {
        const data = await getOrder(id)
        if (!data.id || !data) return reply.status(404).send(
            {success: false, error: 'Order not found'}
        )

        const {customer, order} = await arrangeOrder(data, request)

        const products = data.products
        await request.server.db.fitness.order.insertOrder(order)
        const err = await request.server.db.fitness.order.insertProducts(products, order.pedido_id)
        console.log(err)


        if (event === "order/paid" && Number(order.total) > 675) await createRepositionUser(customer.cliente_id)
        if (event === "order/cancelled" || Number(order.total) < 675) await removeRepositionUser(customer.cliente_id)

        // if (data.payment_status === 'paid') {
        // const config = {data, event, customer, test}
        //     const {status, resp} = await couponManager(config)
        //     return reply.status(status).send({data: resp})
        // }

        return reply.status(201).send({data: order})
    } catch (e) {
        return reply.status(500).send({error: e})
    }
}

export default postOrder;

