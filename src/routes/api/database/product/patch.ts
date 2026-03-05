import {RouteHandlerMethod} from "fastify";
import {getProduct, getProductsByDate} from "@api/tiny/product.js";
import {fixImgResult} from "@plugins/interface.js";
import {sleep} from "@/lib/util/sleep.js";
import {percent} from "@/lib/util/percent.js";
import {dateDiff} from "@/lib/util/time/date-diff.js";

interface Tested {
    updated: (number | string)[],
    error: TestedError[]
}

interface TestedError {
    id: number | string,
    sku: string
    err: string
}

const patchProduct: RouteHandlerMethod = async (request, reply) => {
    try {
        const {date, all, fixImg} = request.body as any;
        const tested: Tested = {
            updated: [],
            error: []
        }
        if (fixImg) {
            let miss = []
            const data = (await request.server.db.fitness.product.selectBrokenImg()) as fixImgResult[];
            if (!data) return reply.status(400).send({error: 'No broken images found'})
            for (const x of data) {
                const id = x.tiny_id
                const tinyData = await getProduct(id)
                if (!tinyData) {
                    miss.push(id);
                    continue;
                }
                if (tinyData.retorno.erros) {
                    miss.push({
                        id,
                        error: tinyData.retorno.erros.map(e => e.erro).join(', ')
                    })
                    continue;
                }
                const error = await request.server.db.fitness.product.insert(tinyData.retorno.produto)

                if (error) miss.push({id, error})
                await sleep(200)
            }
            return reply.status(201).send({
                data: {
                    errors: {qnty: miss.length, ids: miss},
                    fixed: data.length - miss.length,
                }
            })
        } else {
            console.log("Colleting products")
            const data = await getProductsByDate(date)
            const start = new Date()
            const ids = data.map(x => x.id)
            let iterableIds: (number[] | string[]) | null = ids;
            console.log(`products: ${iterableIds.length}`)

            if (!all) {
                iterableIds = await request.server.db.fitness.product.selectNew(ids)
                if (!iterableIds) return reply.status(404).send({error: 'No new products found'})
            }

            let i = 0
            for (const id of iterableIds) {
                i++
                const data = await getProduct(id)
                console.log(`id: ${id} [${percent(i, iterableIds.length)}%]`)
                if (!data) {
                    tested.error.push({id, err: "not found", sku: ''});
                    continue;
                }

                if (data.retorno.erros) tested.error.push({
                    id,
                    err: data.retorno.erros.map(e => e.erro).join(', '),
                    sku: ""
                })

                const err = await reply.server.db.fitness.product.insert(data.retorno.produto)
                if (err) {
                    console.error(data.retorno.produto.codigo)
                    tested.error.push({
                        id,
                        err: JSON.stringify(err),
                        sku: data.retorno.produto.codigo
                    })
                } else tested.updated.push(id)
                if (i % 50 === 0) {
                    const {hours, minutes, seconds} = dateDiff(start, new Date())
                    console.log(`${hours}h ${minutes}m ${seconds}s`)
                }
                if (all && ids.length > 30) await sleep(1000)
            }
            const {hours, minutes, seconds} = dateDiff(start, new Date())
            console.log(`${hours}h ${minutes}m ${seconds}s`)
            return reply.status(201).send({data: tested})
        }
    } catch (e) {
        return reply.status(500).send({error: e})
    }
}

export default patchProduct;