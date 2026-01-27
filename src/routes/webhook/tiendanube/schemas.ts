import { errorSchemas } from "@/lib/schemas/errors.js";

export const webhookSchema = {
  tags: ["Tiendanube"],
  body: {
    type: "object",
    required: ["store_id", "id", "event"],
    properties: {
      store_id: {
        anyOf: [{ const: 4820240 }, { const: "4820240" }],
      },
      id: { type: "number", minimum: 1 },
      event: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        data: {},
      },
    },
    202: {
      type: "object",
      properties: {
        data: {},
      },
    },
    400: errorSchemas.badRequest,
    404: errorSchemas.notFound,
    500: errorSchemas.internalError,
  },
};
