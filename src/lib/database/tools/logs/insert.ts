import {Pool} from "mysql2/promise";
import {insertLogSql} from "@/lib/database/tools/logs/sql.js";
import {FastifyReply, FastifyRequest} from "fastify";

export const insert = async (
    req: FastifyRequest,
    rep: FastifyReply,
    error: any | null,
    pool: Pool
) => {
    const errorResp =
        error instanceof Error ? error.message
            : error ? String(error)
                : null;
    const data = {
        endpoint: req.url,
        body: req.body ? JSON.stringify(req.body) : null,
        status: rep.statusCode,
        error: errorResp,
        method: req.method,
        startDate: req.startDate,
        duration: new Date().getTime() - req.startDate.getTime(),
        enviroment: process.env.NODE_ENV || "prod",
    };

    const insert = [
        data.endpoint,
        data.body,
        data.status,
        data.error,
        data.method,
        data.startDate,
        data.duration,
        data.enviroment,
    ];
    if (data.endpoint.includes("/docs")) return;

    try {
        await pool.execute(insertLogSql, insert);
    } catch (e) {
        console.error("Critical error: ", e);
    }
};