import {Pool} from "mysql2/promise";
import {querysLogs} from "@/lib/database/tools/logs/_querys-logs.js";

export const tool = (pool: Pool) => ({
    logs: querysLogs(pool),
})
