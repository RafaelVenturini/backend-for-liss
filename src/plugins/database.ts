import fp from "fastify-plugin";
import {createPool, PoolOptions, RowDataPacket} from "mysql2/promise";
import {appConfig} from "@config";
import {FastifyInstance} from "fastify";
import {fitness} from "@/lib/database/fitness/_fitness-sql.js";
import {tool} from "@/lib/database/tools/_tool.js";
import {fashion} from "@/lib/database/fashion/_fashion.js";

interface SqlTest extends RowDataPacket {
    OK: "OK"
}

const testSql = "select 'ok'"

async function createPoolAndTest(config: PoolOptions, name: string) {
    const pool = createPool(config);
    const [rows] = await pool.execute<SqlTest[]>(testSql);
    console.log(`Database ${name} is ${rows[0].ok}`);
    return pool;
}

async function databasePlugin(fastify: FastifyInstance) {
    console.log("Creating pools...")
    const fitnessPool = await createPoolAndTest(appConfig.databases.fitness, "fitness");
    const fashionPool = await createPoolAndTest(appConfig.databases.fashion, "fashion");
    const toolPool = await createPoolAndTest(appConfig.databases.tools, "tools");


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
