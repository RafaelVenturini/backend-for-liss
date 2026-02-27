import {Pool} from "mysql2/promise";
import {selectCategorysSql} from "@/lib/database/fashion/product/sql/category-sql.js";

export const selectReactCategorys = async (pool: Pool) => {
    const [rows] = await pool.execute(selectCategorysSql);
    return rows;
};