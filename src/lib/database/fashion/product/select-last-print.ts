import {Pool, RowDataPacket} from "mysql2/promise";
import {getLastPrintSql} from "@/lib/database/fashion/product/sql/print-sql.js";

interface SelectLastPrint extends RowDataPacket {
    est_id: string
}

export const selectLastPrint = async (hex: string | null, pool: Pool) => {
    const prefix = hex ? "S" : "E";

    const [rows] = await pool.execute<SelectLastPrint[]>(getLastPrintSql(prefix));
    return rows;
};