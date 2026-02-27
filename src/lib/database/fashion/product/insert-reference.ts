import {Pool} from "mysql2/promise";
import {InsertReference} from "@/types/interface/fashion/product-creator.js";
import {insertReferenceSql} from "@/lib/database/fashion/product/sql/reference-sql.js";

export const insertReference = async (item: InsertReference, pool: Pool) => {
    const {sku, ref, name, price, category} = item;
    const insert = [sku, ref, name, price, category];
    try {
        await pool.execute(insertReferenceSql, insert);
    } catch (e) {
        return {error: e};
    }
};