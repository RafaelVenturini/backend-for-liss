import {Pool} from "mysql2/promise";
import {selectReferencesSql} from "@/lib/database/fashion/product/sql/reference-sql.js";


export const selectReactReference = async (pool: Pool) => {
    const [rows] = await pool.execute(selectReferencesSql);
    return rows;
};