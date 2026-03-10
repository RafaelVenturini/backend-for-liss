import {FastifyInstance} from 'fastify';

export function registerHooks(app: FastifyInstance) {
    app.addHook('onRequest', async (req) => {
        req.startDate = new Date();
    });

    app.addHook('onSend', async (req, rep, payload) => {
        req.rawBody = payload;
        return payload;
    });

    app.addHook('onResponse', async (req, rep) => {
        const error = req.executionError || req.rawBody || null;
        await app.db.tool.logs.insert({req, rep, error, pool: app.db.pool.tool});
    });
}