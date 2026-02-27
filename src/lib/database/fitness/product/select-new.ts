import {ClothsResult} from "@plugins/interface.js";
import {Pool} from "mysql2/promise";

export const selectNew = async (ids: string[], pool: Pool) => {
    if (ids.length === 0) return [];
    const search = ids.map((id) => `ROW(${id})`).join(", ");
    const [rows] = await pool.execute<ClothsResult[]>(`
        SELECT lista.id
        FROM (VALUES ${search}) AS lista(id)
                 LEFT JOIN produto ON lista.id = tiny_id
        WHERE tiny_id IS NULL;
    `);
    return rows.map((row) => row.id);
};