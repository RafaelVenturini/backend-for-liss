import {RouteHandlerMethod} from "fastify";
import {getProduct, getProductsByDate} from "@api/tiny/product.js";
import {fixImgResult} from "@plugins/interface.js";
import {sleep} from "@/lib/util/sleep.js";

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
			const data = (await request.server.db.selectFitnessBrokenImg()) as fixImgResult[];
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
				const error = await request.server.db.insertFitnessProduct(tinyData.retorno.produto)
				
				if (error) miss.push({id, error})
			}
			return reply.status(201).send({
				data: {
					errors: {qnty: miss.length, ids: miss},
					fixed: data.length - miss.length,
				}
			})
		} else {
			const data = await getProductsByDate(date)
			const ids = data.map(x => x.id)
			let iterableIds: (number[] | string[]) | null = ids;
			
			if (!all) {
				iterableIds = await request.server.db.selectNonCreated(ids)
				if (!iterableIds) return reply.status(404).send({error: 'No new products found'})
				
			}
			
			let i = 0
			for (const id of iterableIds) {
				i++
				console.log(id, i, ids.length)
				const data = await getProduct(id)
				if (!data) {
					tested.error.push({id, err: "not found", sku: ''});
					continue;
				}
				
				if (data.retorno.erros) tested.error.push({
					id,
					err: data.retorno.erros.map(e => e.erro).join(', '),
					sku: ""
				})
				
				
				const err = await reply.server.db.insertFitnessProduct(data.retorno.produto)
				if (err) {
					console.error(data.retorno.produto.codigo)
					tested.error.push({
						id,
						err: JSON.stringify(err),
						sku: data.retorno.produto.codigo
					})
				} else tested.updated.push(id)
				if (all && ids.length > 30) await sleep(1000)
			}
			
			return reply.status(201).send({data: tested})
		}
	} catch (e) {
		return reply.status(500).send({error: e})
	}
}

export default patchProduct;