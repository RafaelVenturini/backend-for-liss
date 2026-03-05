export const selectProductSql = `
    SELECT *
    FROM produto
    WHERE CHAR_LENGTH(img) > 10
`

export const selectTinyIdSql = `
    select tiny_id
    from produto
    where prod_id = ?
`