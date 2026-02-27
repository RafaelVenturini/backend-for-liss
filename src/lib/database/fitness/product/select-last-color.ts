import {selectLastColorSql} from "@/lib/database/fitness/product/sql/select-categories.js";
import {Pool} from "mysql2/promise";

export const selectLastColor = async (pool: Pool) => {
    const [rows] = await pool.execute(selectLastColorSql);
    return rows;
};