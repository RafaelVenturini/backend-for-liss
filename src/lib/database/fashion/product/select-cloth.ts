import {Pool} from "mysql2/promise";
import {selectClothsSql} from "@/lib/database/fashion/product/sql/cloth-sql.js";


export const selectReactCloths = async (pool: Pool) => {
    const [rows] = await pool.execute(selectClothsSql);
    return rows;
};