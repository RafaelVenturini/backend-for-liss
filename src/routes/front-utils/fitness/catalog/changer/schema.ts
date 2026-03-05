import {errorSchemas} from "@/lib/schemas/errors.js";

export const PatchFitChangerSchema = {
    tags: ['Alterador - Fitness'],
    body: {
        type: "object",
        required: ["table"],
        properties: {
            table: {enum: ["catalogo", "vitrine"]},
            product: {
                type: 'object',
                properties: {
                    sku: {type: 'string'},
                    sale: {type: 'number'},
                    priority: {type: 'number'},
                    colors: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: {type: 'number'},
                                color: {type: 'string'},
                                stock: {type: 'boolean'},
                                newer: {type: 'boolean'},
                                reposition: {type: 'boolean'},
                                highlight: {type: 'boolean'},
                                img: {type: 'string'}
                            }
                        }
                    }
                }
            },
            color: {
                type: 'object',
                properties: {
                    id: {type: 'number'},
                    color: {type: 'string'},
                    stock: {type: 'boolean'},
                    newer: {type: 'boolean'},
                    reposition: {type: 'boolean'},
                    highlight: {type: 'boolean'},
                    img: {type: 'string'}
                }
            }
        }
    },
    response: {
        200: {},
        400: errorSchemas.badRequest,
        404: errorSchemas.notFound,
        500: errorSchemas.internalError,
    }
}

export const GetFitChangerSchema = {
    tags: ['Alterador - Fitness'],
    response: {
        200: {},
        400: errorSchemas.badRequest,
        404: errorSchemas.notFound,
        500: errorSchemas.internalError,
    }
}

export const PutFitChangerSchema = {
    tags: ['Alterador - Fitness'],
    body: {
        type: "object",
        required: ["id"],
        properties: {
            id: {type: "number"},
        },
    },
    response: {
        200: {},
        400: errorSchemas.badRequest,
        404: errorSchemas.notFound,
        500: errorSchemas.internalError,
    }
}