import {databaseDate} from "@/lib/string/date.js";
import {tinyAnexos} from "@/lib/string/products.js";
import {insertProductSql} from "@/lib/database/fitness/product/sql/insert-product.js";
import {segmentOfSku} from "@/lib/objects/segment-of-sku.js";
import {OneProduct} from "@api/tiny/interfaces.js";
import {Pool} from "mysql2/promise";

export const insertProduct = async (product: OneProduct, pool: Pool) => {
    const {id, nome, codigo, preco, anexos} = product;
    const x = segmentOfSku(codigo, nome);
    if (x === null) return;
    const insert = [
        id,
        databaseDate(new Date()),
        nome,
        codigo,
        preco,
        x.blu,
        x.inf,
        x.top,
        x.tec,
        x.tam,
        x.cor,
        x.mul,
        tinyAnexos(anexos),
    ];

    try {
        await pool.execute(insertProductSql, insert);
    } catch (e) {
        console.log({error: e, insert});
        return {error: {reason: e, insert}};
    }
};