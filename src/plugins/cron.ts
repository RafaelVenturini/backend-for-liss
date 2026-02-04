import {FastifyInstance} from "fastify";
import fp from "fastify-plugin";
import cron from "node-cron"
import {clearCoupons} from "@api/tiendanube/coupon.js";
import {getRepositionUsers, removeRepositionUser} from "@api/tiendanube/reposition.js";
import {sleep} from "@/lib/util/sleep.js";

async function cronPlugin(fastify: FastifyInstance) {

    const clearCupons = cron.schedule("0 0 * * *", () => {
        clearCoupons()
        console.log("Coupons cleared");
    })

    const refreshReposition = cron.schedule("0 0 * * * *", async () => {
        const data = await getRepositionUsers()
        const users = data.price_table.customers.map(x => x.id)
        const select = await fastify.db.selectRepositionUsersToUpdate(users)

        // @ts-ignore
        for (const id of select) {
            await removeRepositionUser(id)
            await sleep(500)
        }
    })

    fastify.addHook('onClose', async () => {
        clearCupons.stop()
        refreshReposition.stop()
    })
}

export default fp(cronPlugin);