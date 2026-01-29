import {RouteHandlerMethod} from "fastify";
import {skuIncrease} from "@/lib/util/sku-increase.js";

interface PostBody {
    nome: string | null;
    hex: string | null;
    tecido: string | null;
}

const postPrint: RouteHandlerMethod = async (request, reply) => {
    try {
        const {nome, hex, tecido} = request.body as PostBody;
        if (!nome || !tecido) return reply.status(400).send({error: 'Missing required parameters'});
        const lastPrintResult = await request.server.db.fashion.selectLastPrint(hex)
        const lastPrint = lastPrintResult[0].est_id
        const newPrint = skuIncrease(lastPrint)

        const insert = {
            est_id: newPrint,
            name: nome,
            tec_id: tecido,
            ref: hex || newPrint,
        }

        const result = await request.server.db.fashion.insertPrint(insert)
        if (!result) return reply.status(201).send({data: insert});
        if (result.error.errno === 1216) return reply.status(404).send({error: "Cloth not found"})

    } catch (e) {
        return reply.status(500).send({error: e})
    }
}

export default postPrint;