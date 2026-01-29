import {errorSchemas} from "@/lib/schemas/errors.js";


export const DefaultSchema = {
    tags: ["Argos - Fashion"],
    response: {
        200: {
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

export const PostPrintSchema = {
    tags: ["Argos - Fashion"],
    body: {
        type: "object",
        required: ["nome", "tecido"],
        properties: {
            nome: {type: "string"},
            hex: {type: "string"},
            tecido: {type: "string"},
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

export const PostRefSchema = {
    tags: ["Argos - Fashion"],
    body: {
        type: "object",
        required: ["ref", "name", "category", "price"],
        properties: {
            ref: {type: "string"},
            name: {type: "string"},
            category: {type: "string"},
            price: {type: "number"},
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