import {RouteHandlerMethod} from "fastify";
import {getProduct, getProductsByDate} from "@api/tiny/product.js";
import {fixImgResult} from "@plugins/interface.js";

interface Tested {
	updated: number[],
	error: TestedError[]
}

interface TestedError {
	id: number,
	sku: string
	err: string
}

const patchProduct: RouteHandlerMethod = async (request, reply) => {
	console.log('omg')
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
		} else if (all) {
			return reply.status(501).send({error: 'Not implemented yet'})
		} else {
			const data = await getProductsByDate(date)
			const ids = data.map(x => x.id)
			const nonCreated = await request.server.db.selectNonCreated(ids)
			if (!nonCreated) return reply.status(404).send({error: 'No new products found'})
			console.log(nonCreated)
			for (const id of nonCreated) {
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
			}
			
			return reply.status(201).send({data: tested})
		}
	} catch (e) {
		return reply.status(500).send({error: e})
	}
}

export default patchProduct;