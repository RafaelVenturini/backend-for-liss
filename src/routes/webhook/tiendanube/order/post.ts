import {RouteHandlerMethod} from "fastify";
import {getOrder} from "@api/tiendanube/order.js";
import {arrangeOrder} from "@api/tiendanube/arrange-order.js";
import {couponManager} from "@api/tiendanube/coupon-manager.js";
import {createRepositionUser, removeRepositionUser} from "@api/tiendanube/reposition.js";


const postOrder: RouteHandlerMethod = async (request, reply) => {
    const {id, event, test} = request.body as any

    try {
        const data = await getOrder(id)
        if (!data.id || !data) return reply.status(404).send(
            {success: false, error: 'Order not found'}
        )

        const {customer, order} = await arrangeOrder(data, request.server.db)

        const products = data.products
        await request.server.db.insertFitnessOrder(order)
        const err = await request.server.db.insertFitnessOrderProducts(products, order.pedido_id)
        console.log(err)

        const config = {data, event, mailer: request.server.mailer, customer, test}

        if (event === "order/paid" && Number(order.total) > 675) await createRepositionUser(customer.cliente_id)
        if (event === "order/cancelled" || Number(order.total) < 675) await removeRepositionUser(customer.cliente_id)

        if (data.payment_status === 'paid') {
            const {status, resp} = await couponManager(config)
            return reply.status(status).send({data: resp})
        }

        return reply.status(201).send({data: order})
    } catch (e) {
        return reply.status(500).send({error: e})
    }
}

export default postOrder;

