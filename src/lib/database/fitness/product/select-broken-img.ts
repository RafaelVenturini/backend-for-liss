import {Pool} from "mysql2/promise";
import {fixImgResult} from "@plugins/interface.js";
import {selectBrokenImgSql} from "@/lib/database/fitness/product/sql/select-broken-img.js";

export const selectBrokenImg = async (pool: Pool): Promise<fixImgResult[]> => {
    const [rows] =
        await pool.execute<fixImgResult[]>(selectBrokenImgSql);
    return rows;
};