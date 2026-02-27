import {Pool} from "mysql2/promise";
import {InsertPrint} from "@/types/interface/fashion/product-creator.js";
import {insertPrintSql} from "@/lib/database/fashion/product/sql/print-sql.js";

export const insertPrint = async (item: InsertPrint, pool: Pool) => {
    const {est_id, name, tec_id, ref} = item;
    const insert = [est_id, name, tec_id, ref];

    try {
        await pool.execute(insertPrintSql, insert);
    } catch (e) {
        return {error: e};
    }
};