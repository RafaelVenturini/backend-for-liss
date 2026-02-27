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