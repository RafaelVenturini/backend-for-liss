export const errorSchemas = {
	badRequest: {
		type: 'object',
		properties: {
			statusCode: {type: 'number', example: 400},
			error: {type: 'string'}
		}
	},
	notFound: {
		type: 'object',
		properties: {
			statusCode: {type: 'number', example: 404},
			error: {type: 'string'}
		}
	},
	internalError: {
		type: 'object',
		properties: {
			statusCode: {type: 'number', example: 500},
			error: {type: 'string'}
		}
	}
}