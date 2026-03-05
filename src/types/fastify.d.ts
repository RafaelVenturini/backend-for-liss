import 'fastify';
import {Pool} from "mysql2/promise";
import {fitness} from "@/lib/database/fitness/_fitness-sql.js";
import {tool} from "@/lib/database/tools/_tool.js";
import {fashion} from "@/lib/database/fashion/_fashion.js";

declare module 'fastify' {
    interface FastifyRequest {
        startDate: Date;
        executionError?: any
        rawBody?: any
    }
}

declare module 'fastify' {
    interface FastifyInstance {
        db: {
            pool: {
                fitness: Pool;
                fashion: Pool;
                tool: Pool;
            };
            fitness: ReturnType<typeof fitness>;
            fashion: ReturnType<typeof fashion>;
            tool: ReturnType<typeof tool>;
        };
    }
}