const defaultModel = {
    type: 'object',
    properties: {
        status: {type: "string"},
        details: {
            type: "object",
            properties: {
                fitness: {type: "string"},
                fashion: {
                    type: ["string", "null"],
                    nullable: true
                },
                test: {type: "string"}
            },
        }
    },
}

export const HealthSchema = {
    tags: ['Health'],
    response: {
        200: defaultModel,
        503: defaultModel
    }
}