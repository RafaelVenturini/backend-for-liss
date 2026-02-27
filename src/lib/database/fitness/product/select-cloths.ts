import {Pool} from "mysql2/promise";
import {ClothsResult} from "@plugins/interface.js";
import {selectClothSql} from "@/lib/database/fitness/product/sql/select-categories.js";

export const selectCloths = async (pool: Pool): Promise<ClothsResult[] | null> => {
    const [rows] = await pool.execute<ClothsResult[]>(selectClothSql);
    return rows;
};