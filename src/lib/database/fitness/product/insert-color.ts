import {databaseDate} from "@/lib/string/date.js";
import {insertColorSql, insertMultColorSql} from "@/lib/database/fitness/product/sql/select-categories.js";
import {Pool} from "mysql2/promise";

export const insertFitnessColor = async (name: string, sku: number, pool: Pool) => {
    const solid = name.includes("Bicolor") || name.includes("Tricolor");
    try {
        if (solid)
            await pool.execute(insertColorSql, [
                sku,
                name,
                databaseDate(new Date()),
            ]);
        else
            await pool.execute(insertMultColorSql, [
                sku,
                name,
                databaseDate(new Date()),
            ]);
    } catch (e: any) {
        if (e.code === "ER_DUP_ENTRY") {
            console.log("Tentativa de adicionar cor já existente");
            return {error: "Color already exists"};
        }
        console.log(e);
        return {error: e};
    }
};