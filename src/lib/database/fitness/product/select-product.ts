import {Pool} from "mysql2/promise";
import {selectProductSql} from "@/lib/database/fitness/product/sql/select-product.js";

export const selectProduct = async (
    tinyId: string | null,
    sku: string | null,
    pool: Pool
) => {
    if (!tinyId && !sku) return null;
    if (!tinyId) tinyId = null;
    if (!sku) sku = null;

    const [rows] = await pool.execute(selectProductSql, [tinyId, sku]);

    return rows;
};