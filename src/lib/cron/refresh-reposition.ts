import {getRepositionUsers, removeRepositionUser} from "@api/tiendanube/reposition.js";
import {sleep} from "@/lib/util/sleep.js";
import {FastifyInstance} from "fastify";

export async function refreshRepositionFunc(fastify: FastifyInstance) {
    console.log('Refreshing Reposition...');
    const data = await getRepositionUsers()
    const users = data.price_table.customers.map(x => x.id)
    // console.log(users)
    const select = await fastify.db.fitness.customer.selectReposition(users)

    console.log('ids: ', select)

    // @ts-ignore
    for (const id of select) {
        console.log(id)
        const resp = await removeRepositionUser(id)
        console.log(resp)
        await sleep(500)
    }

    console.log('Reposition refreshed successfully');
}