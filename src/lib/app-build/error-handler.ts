import {FastifyError, FastifyInstance} from 'fastify';

export function registerErrorHandler(app: FastifyInstance): FastifyInstance {
    app.setErrorHandler(async (error: FastifyError, request, reply) => {
        request.executionError = error;

        if (error.validation) {
            return reply.status(400).send({statusCode: 400, error: error.message});
        }

        if (error.statusCode && error.statusCode < 500) {
            return reply.status(error.statusCode).send({statusCode: error.statusCode, error: error.message});
        }

        request.log.error({
            msg: 'Error catched in global error handler',
            error,
            payload: request.body,
        });

        reply.status(500).send({error: 'Internal Server Error', msg: error});
    });

    return app;
}