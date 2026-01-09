import {RouteHandlerMethod} from "fastify";
import {getProduct} from "@api/tiny/product.js";
import {segmentOfSku} from "@/lib/objects/segment-of-sku.js";
import {createNewColor} from "@api/database/color.js";

const postProduct: RouteHandlerMethod = async (request, reply) => {
	try {
		const {tinyId} = request.body as any;
		
		const data = await getProduct(tinyId)
		if (!data) return reply.status(404).send({error: 'Product not found'})
		if (data.retorno.erros) return reply.status(400).send({error: data.retorno.erros.map(e => e.erro).join(', ')})
		
		const err = await reply.server.db.insertFitnessProduct(data.retorno.produto)
		if (err) {
			switch (err.errno) {
				case 1062:
					return reply.status(409)
						.send({error: 'O produto já está cadastrado.'});
				case 1452:
					const lastColorSelect = await reply.server.db.selectLastColor();
					if (lastColorSelect) {
						const prodName = data.retorno.produto.nome
						const prodSku = data.retorno.produto.codigo
						// @ts-ignore
						const lastColor = lastColorSelect[0].id;
						const x = segmentOfSku(prodName, prodSku)
						if (!x) return reply.status(400).send({error: "Não foi possivel separar o SKU do produto."});
						const actualColor = x.mul ? x.mul : x.cor
						if (!actualColor) return reply.status(404).send({error: "O SKU não tem cor"})
						
						if (Number(lastColor) < Number(actualColor)) {
							await createNewColor(prodName, actualColor, reply.server.db)
							const err = await reply.server.db.insertFitnessProduct(data.retorno.produto)
							if (!err) return reply.status(201).send({data: data.retorno.produto})
							else return reply.status(400).send({error: err})
						}
					}
					
					return reply.status(400)
						.send({error: 'A cor informada é inválida ou não existe.'});
				case 1048:
					return reply.status(400)
						.send({error: 'Faltam informações obrigatórias para o produto.'});
				default:
					console.error('Erro de Banco:', err);
					throw err;
			}
		}
		return reply.status(201).send({data: data.retorno.produto})
		
	} catch (e) {
		return reply.status(500).send({error: e})
	}
}

export default postProduct;