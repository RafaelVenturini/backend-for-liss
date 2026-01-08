import {errorSchemas} from "@/lib/schemas/errors.js";

export const ProductSchema = {
	body: {
		type: "object",
		required: ["dados"],
		properties: {
			dados: {
				type: "object",
				required: ["idProduto"],
				properties: {
					idProduto: {
						type: "number",
						minimum: 1,
						description: "ID do produto"
					}
				},
			}
		}
	},
	response: {
		201: {
			type: "object",
			properties: {
				data: {}
			}
		},
		400: errorSchemas.badRequest,
		404: errorSchemas.notFound,
		500: errorSchemas.internalError,
	}
}