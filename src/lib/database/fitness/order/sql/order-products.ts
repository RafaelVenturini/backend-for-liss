export const insertSql = `
    INSERT INTO pedido_produto(pedido_id, produto_id, qntd)
    VALUES (?,
            (select produto_id from produto where sku = ? limit 1),
            ?)
    ON DUPLICATE KEY UPDATE qntd=values(qntd)
`

export const deleteSql = `
    DELETE
    FROM pedido_produto
    WHERE pedido_id = ?
`
