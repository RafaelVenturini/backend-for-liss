export const selectProductSql = `
    SELECT *
    FROM produto
    WHERE CHAR_LENGTH(img) > 10
`