import {FastifyInstance} from "fastify";
import fp from "fastify-plugin";

async function cronPlugin(fastify: FastifyInstance) {

    // const clearCupons = cron.schedule("0 0 * * *", () => {
    //     clearCoupons()
    //     console.log("Coupons cleared");
    // })
    //
    // const refreshReposition = cron.schedule("0 * * * * *", async () => {
    //     await refreshRepositionFunc(fastify)
    // })
    //
    // fastify.addHook('onClose', async () => {
    //     clearCupons.stop()
    //     refreshReposition.stop()
    // })
}

export default fp(cronPlugin);