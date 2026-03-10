import {getRepositionUsers, removeRepositionUser} from "@api/tiendanube/reposition.js";
import {sleep} from "@/lib/util/sleep.js";
import {FastifyInstance} from "fastify";

export async function refreshRepositionFunc(fastify: FastifyInstance) {
    console.log('[REPOSITION]: STARTING');
    const data = await getRepositionUsers()
    const users = data.price_table.customers.map(x => x.id)

    if (users.length > 0) {

        const select = await fastify.db.fitness.customer.selectReposition(users)

        const ids = select.map((item) => item.nuvem_id)
        if (ids.length > 0) {
            for (const id of ids) {
                await removeRepositionUser(id)
                await sleep(500)
            }
        }
        console.log(`[REPOSITION]: ${ids.length} repositions deleted`);
    }
    console.log(`[REPOSITION]: FINISHED (${users.length} users)`);

}