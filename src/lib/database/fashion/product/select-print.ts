import {Pool} from "mysql2/promise";
import {selectPrintsSql} from "@/lib/database/fashion/product/sql/print-sql.js";

export const selectReactPrint = async (pool: Pool) => {
    const [rows] = await pool.execute(selectPrintsSql);
    return rows;
};