import {selectChangerProductsSql} from "@/lib/database/fitness/changer/sql/select-all.js";
import {Pool, RowDataPacket} from "mysql2/promise";

interface SelectChangerProductsSql extends RowDataPacket {
    prod_id: number;
    name: string;
    sku: string;
    img: string;
    preco: string;
    promocao: string;
    tamanho: string;
    tipo: string;
    estoque: boolean;
    novidade: boolean;
    destaque: boolean;
    reposicao: boolean;
    prioridade: number;
    cor: string;
}

export const selectChanger = async (table: "catalogo" | "vitrine", pool: Pool) => {
    const [rows] = await pool.execute<SelectChangerProductsSql[]>(selectChangerProductsSql(table));
    return rows;
};