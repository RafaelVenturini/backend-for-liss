import {errorSchemas} from "@/lib/schemas/errors.js";

export const GetProductSchema = {
	description: "Busca um produto pelo sku ou tinyId",
	tags: ["Database"],
	querystring: {
		type: "object",
		minProperties: 1,
		properties: {
			tinyId: {type: "string"},
			sku: {type: "string"},
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

export const PostProductSchema = {
	description: "Cria ou atualiza um produto no banco de dados",
	tags: ["Database"],
	body: {
		type: "object",
		minProperties: 1,
		properties: {
			tinyId: {type: "string"},
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
		409: errorSchemas.duplicateKey,
		500: errorSchemas.internalError,
	}
}

export const PatchProductSchema = {
	description: "Atualiza todos os produtos a partir de uma data",
	tags: ["Database"],
	body: {
		type: "object",
		minProperties: 1,
		properties: {
			date: {
				type: "string",
				examples: ["20/01/2022"],
				minLength: 10,
				maxLength: 10,
			},
			all: {type: "boolean", default: false,},
			fixImg: {type: "boolean", default: false,}
		},
		oneOf: [
			{
				required: ["fixImg"],
				not: {anyOf: [{required: ["date"]}, {required: ["all"]}]}
			},
			{
				required: ["date"],
				not: {required: ["fixImg"]},
				properties: {
					all: {type: "boolean"}
				}
			}
		]
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

export const PostColorSchema = {
	description: "Cria ou atualiza uma cor no banco de dados",
	tags: ["Database"],
	body: {
		type: "object",
		properties: {
			name: {type: "string"},
			sku: {type: "string"},
		},
		required: ["name", "sku"]
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
		409: errorSchemas.duplicateKey,
		500: errorSchemas.internalError,
	}
}
