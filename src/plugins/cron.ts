import {FastifyInstance} from "fastify";
import fp from "fastify-plugin";
import cron from "node-cron"
import {clearCoupons} from "@api/tiendanube/coupon.js";

async function cronPlugin(fastify: FastifyInstance) {

    const clearCupons = cron.schedule("0 0 * * *", () => {
        clearCoupons()
        console.log("Coupons cleared");
    })

    fastify.addHook('onClose', async () => {
        clearCupons.stop()
    })
}

export default fp(cronPlugin);