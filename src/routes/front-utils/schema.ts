import {errorSchemas} from "@/lib/schemas/errors.js";

export const PrintSchema = {
	tags: ['Front Utils'],
	querystring: {
		type: "object",
		minProperties: 1,
		properties: {
			print: {type: "string"},
		}
	},
	response: {
		200: {
			type: 'object',
			properties: {
				data: {}
			}
		},
		400: errorSchemas.badRequest,
		404: errorSchemas.notFound,
		500: errorSchemas.internalError,
	}
}