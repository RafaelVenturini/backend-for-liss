import {RouteHandlerMethod} from "fastify";
import {ChangerBody} from "@/lib/database/fitness/changer/types/changer-interfaces.js";
import {invalidateFitness} from "@/lib/util/cache/invalidate-fitness.js";


const patchChanger: RouteHandlerMethod = async (request, reply) => {
    const {color, product, table} = request.body as ChangerBody;
    let err = null

    if (color) err = await request.server.db.fitness.changer.updateColor({color, table});
    if (product) err = await request.server.db.fitness.changer.updateProduct({product, table});

    const whatsapp = table === 'catalogo'

    await invalidateFitness(whatsapp)


    if (err) reply.code(400).send({error: err})
    reply.code(200).send({ok: true})
};

export default patchChanger;
