export const selectCategorysSql = `
    SELECT nome   label,
           cat_id value
    FROM categoria
`

export const selectReferencesSql = `
    SELECT CONCAT_WS(' - ', nome, sku) label,
           sku                         value
    FROM PRODUTO
`

export const selectClothsSql = `
    SELECT tec_id value, nome label
    FROM tecido
`

export const selectPrintsSql = `
    SELECT CONCAT_WS(' - ', e.nome, est_id, t.nome) label,
           est_id                                   value,
           referencia                               img
    FROM ESTAMPA e
             JOIN tecido t on e.tec_id = t.tec_id
    ORDER BY value
`