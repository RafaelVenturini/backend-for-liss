import fp from "fastify-plugin";
import {createPool} from "mysql2/promise";
import {appConfig} from "@config";
import {FastifyInstance} from "fastify";
import {fitness} from "@/lib/database/fitness/_fitness-sql.js";
import {tool} from "@/lib/database/tools/_tool.js";
import {fashion} from "@/lib/database/fashion/_fashion.js";

async function databasePlugin(fastify: FastifyInstance) {
    const fitnessPool = createPool(appConfig.databases.fitness);
    const fashionPool = createPool(appConfig.databases.fashion);
    const toolPool = createPool(appConfig.databases.tools);

    fastify.decorate("db", {
        pool: {
            fitness: fitnessPool,
            fashion: fashionPool,
            tool: toolPool,
        },
        fitness: fitness(fitnessPool),
        fashion: fashion(fashionPool),
        tool: tool(toolPool),
    });

    fastify.addHook("onClose", async () => {
        await Promise.all([fitnessPool.end(), fashionPool.end(), toolPool.end()]);
        fastify.log.info("Database connection closed.");
    });
}

export default fp(databasePlugin);
