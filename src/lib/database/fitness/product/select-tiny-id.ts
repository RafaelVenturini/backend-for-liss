import {Pool, RowDataPacket} from "mysql2/promise";
import {selectTinyIdSql} from "@/lib/database/fitness/product/sql/select-product.js";

interface Row extends RowDataPacket {
    tiny_id: string
}

export const selectTinyId = async (color: number, pool: Pool) => {
    const [rows] = await pool.query<Row[]>(selectTinyIdSql, [color]);
    return rows;
}