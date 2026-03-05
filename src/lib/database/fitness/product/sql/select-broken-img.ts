export const selectBrokenImgSql = `
    SELECT tiny_id
    FROM produto
    WHERE img IS NULL
       OR LENGTH(img) < 10
`