export const selectReferencesSql = `
    SELECT CONCAT_WS(' - ', nome, sku) label,
           sku                         value
    FROM PRODUTO
`

export const insertReferenceSql = `
    INSERT INTO produto(sku, ref, nome, preco, criacao, cat_id)
    VALUES (?, ?, ?, ?, NOW(), ?)
`