import {Pool} from "mysql2/promise";
import {insert} from "@/lib/database/tools/logs/insert.js";
import type {FastifyReply, FastifyRequest} from "fastify";


interface Insert {
    req: FastifyRequest,
    rep: FastifyReply,
    error: any | null,
    pool: Pool
}

export const querysLogs = (pool: Pool) => ({
    insert: ({req, rep, error}: Insert) => insert(req, rep, error, pool)
})