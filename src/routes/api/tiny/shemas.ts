import {errorSchemas} from "@/lib/schemas/errors.js";

export const ProductSchema = {
	tags: ["Tiny"],
	querystring: {
		type: "object",
		required: ["id"],
		properties: {
			id: {
				type: "string",
				description: "ID do produto"
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

export const ProductListSchema = {
	tags: ["Tiny"],
	body: {
		type: "object",
		required: ["date"],
		properties: {date: {type: "string"}},
	},
	response: {
		200: {
			type: "object",
			properties: {
				data: {}
			},
		},
		400: errorSchemas.badRequest,
		404: errorSchemas.notFound,
		500: errorSchemas.internalError,
	}
}