import {errorSchemas} from "@/lib/schemas/errors.js";

export const generateTokenSchema = {
    tags: ["Zuma ERP"],
    response: {
        200: {
            type: "string",
        },
        400: errorSchemas.badRequest,
        404: errorSchemas.notFound,
        500: errorSchemas.internalError,
    }
}

export const getProductSchema = {
    tags: ["Zuma ERP"],
    querystring: {
        type: "object",
        properties: {
            date: {type: "string"},
            id: {type: "string"},
        }
    }, response: {
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

export const defaultSchema = {
    tags: ["Zuma ERP"],
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