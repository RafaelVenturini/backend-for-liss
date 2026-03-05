import {errorSchemas} from "@/lib/schemas/errors.js";

export const FitCatalogDefaultSchema = {
    tags: ['Catalogo - Fitness'],
    response: {
        200: {
            type: 'object',
            properties: {}
        },
        400: errorSchemas.badRequest,
        404: errorSchemas.notFound,
        500: errorSchemas.internalError,
    }
}

export const FitCatalogListSchema = {
    tags: ['Catalogo - Fitness'],
    body: {
        type: "object",
        properties: {
            uuid: {type: "string"},
            products: {type: "array"},
        },
    },
    querystring: {
        type: "string",
        properties: {uuid: "String"},
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

export const FitCatalogCacheSchema = {
    tags: ['Catalogo - Fitness'],
    body: {
        type: "object",
        properties: {
            whatsapp: {type: "boolean"},
        },
    },
    response: {
        204: {},
        400: errorSchemas.badRequest,
        500: errorSchemas.internalError,
    }
}