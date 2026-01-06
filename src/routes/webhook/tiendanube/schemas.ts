import {errorSchemas} from "@/lib/schemas/errors.js";

export const webhookSchema = {
	body: {
		type: "object",
		required: ["store_id", "id", "event"],
		properties: {
			store_id: {const: 4820240},
			id: {type: "number", minimum: 1},
			event: {type: "string"},
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
