import {onDuplicatedKeyUpdate} from "@/lib/string/database.js";

export const insertProductSql = `
    INSERT INTO produto(tiny_id, criacao, nome, sku, preco, blu_id, inf_id,
                        top_id,
                        tec_id, tamanho, cor_id, mul_id, img)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ${onDuplicatedKeyUpdate(["nome", "sku", "preco", "blu_id",
                "inf_id", "top_id", "tec_id", "tamanho", "cor_id", "mul_id", "img"])}
`

export const selectProductSql = `
    SELECT *
    FROM produto
    WHERE CHAR_LENGTH(img) > 10
`

export const selectBrokenImgSql = `
    SELECT tiny_id
    FROM produto
    WHERE img IS NULL
       OR LENGTH(img) < 10
`

export const selectClothSql = `
    SELECT nome
    FROM tecido
`

export const insertColorSql = `
    INSERT INTO cor(cor_id, nome, criacao)
    VALUES (?, ?, ?)
`

export const insertMultColorSql = `
    INSERT INTO multcor(mult_id, nome, criacao)
    VALUES (?, ?, ?)
`

export const selectLastColorSql = `
    SELECT mult_id id
    FROM multcor
    UNION
    SELECT cor_id id
    FROM cor
    ORDER BY id DESC
    LIMIT 1
`

export const selectRepositionUsersToUpdateSql = `
    SELECT c.nuvem_id
    FROM pedido p
             JOIN liss_fitness.cliente c ON p.cliente_id = c.cliente_id
    WHERE c.nuvem_id IN (?)
    GROUP BY c.nuvem_id
    HAVING DATEDIFF(NOW(), MAX(p.data_pedido)) > 15
`