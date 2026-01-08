import {RouteHandlerMethod} from "fastify";
import {getProduct} from "@api/tiny/product.js";

interface ProductBody {
	dados: {
		idProduto: number;
	};
}

const postProduct: RouteHandlerMethod = async (request, reply) => {
	try {
		const {dados} = request.body as ProductBody;
		const {idProduto} = dados;
		
		const data = await getProduct(idProduto)
		if (!data) return reply.status(404).send({error: 'Product not found'})
		if (data.retorno.erros) return reply.status(400).send({error: data.retorno.erros.map(e => e.erro).join(', ')})
		
		return reply.status(201).send({})
	} catch (e) {
		return reply.status(500).send({error: e})
	}
}

export default postProduct;