export const HealthSchema = {
    tags: ['Health'],
    response: {
        200: {},
        500: {type: 'object', properties: {data: {}}},
    }
}