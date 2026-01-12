import {errorSchemas} from "@/lib/schemas/errors.js";

export const PostCouponSchema = {
	tags: ["Tiendanube"],
	body: {
		type: "object",
		required: ["customer", "order", "value", "startDate", "event"],
		properties: {
			customer: {type: "string", examples: ["Singed"]},
			order: {type: "number", examples: ["42069"]},
			value: {type: "number", examples: ["6769.42"]},
			startDate: {type: "string", examples: ["2026-01-01"]},
			event: {type: "string", examples: ["order/created"]},
		}
	},
	response: {
		201: {
			type: "object",
			properties: {
				data: {}
			}
		},
		204: {
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
export const PatchCouponSchema = {
	tags: ["Tiendanube"],
	response: {
		200: {
			type: "object",
			properties: {
				removed: {
					type: "number",
					description: "Quantidade de cupons removidos"
				}
			}
		},
		500: errorSchemas.internalError,
	}
}