import {onDuplicatedKeyUpdate} from "@/lib/string/database.js";

export const insertProductSql = `
    INSERT INTO produto(tiny_id, criacao, nome, sku, preco, blu_id, inf_id,
                        top_id,
                        tec_id, tamanho, cor_id, mul_id, img)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ${onDuplicatedKeyUpdate(["tiny_id", "nome", "sku", "preco", "blu_id",
                "inf_id", "top_id", "tec_id", "tamanho", "cor_id", "mul_id", "img"])}
`