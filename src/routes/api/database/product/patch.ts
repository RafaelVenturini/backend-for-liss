import {RouteHandlerMethod} from "fastify";
import {getProduct, getProductsByDate} from "@api/tiny/product.js";
import {fixImgResult} from "@plugins/interface.js";

const patchProduct: RouteHandlerMethod = async (request, reply) => {
	try {
		const {date, all, fixImg} = request.body as any;
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
		}
		
		if (date || all) return reply.status(501).send({error: 'Not implemented yet'})
		
		const data = await getProductsByDate(date)
		if (!data) {
			return reply.status(400).send(
				{error: 'idk idc'}
			)
		}
		
		// reply.server.db.insertFitnessProduct()
		
		return reply.status(201).send({data})
	} catch (e) {
		return reply.status(500).send({error: e})
	}
}

export default patchProduct;