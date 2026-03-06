import {FastifyInstance} from "fastify";
import fp from "fastify-plugin";
import cron from 'node-cron';
import {refreshRepositionFunc} from "@/lib/cron/refresh-reposition.js";

async function cronPlugin(fastify: FastifyInstance) {

    const refreshReposition = cron.schedule("0 0 0 * * *", async () => {
        await refreshRepositionFunc(fastify)
    })

    fastify.addHook('onClose', async () => {
        refreshReposition.stop()
    })
}

export default fp(cronPlugin);