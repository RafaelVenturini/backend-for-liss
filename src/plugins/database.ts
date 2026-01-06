import fp from 'fastify-plugin';
import {createPool, Pool} from "mysql2/promise";
import {appConfig} from "@config";
import {FastifyInstance} from "fastify";

async function databasePlugin(fastify: FastifyInstance) {
	const fitnessPool = createPool(appConfig.databases.fitness)
	const fashionPool = createPool(appConfig.databases.fashion)
	const toolPool = createPool(appConfig.databases.tools)
	
	fastify.decorate('db', {
		fitness: fitnessPool,
		fashion: fashionPool,
		tool: toolPool
	})
	
	fastify.addHook('onClose', async () => {
		await Promise.all([fitnessPool.end(), fashionPool.end(), toolPool.end()]);
		fastify.log.info('Database connection closed.');
	})
}

declare module 'fastify' {
	interface FastifyInstance {
		db: {
			fitness: Pool;
			fashion: Pool;
			tool: Pool;
		};
	}
}

export default fp(databasePlugin);