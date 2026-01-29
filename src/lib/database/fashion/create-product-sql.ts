export const insertPrintSql = `
    INSERT INTO estampa(est_id, nome, tec_id, referencia)
    VALUES (?, ?, ?, ?)
`

export const insertReferenceSql = `
    INSERT INTO produto(sku, ref, nome, preco, criacao, cat_id)
    VALUES (?, ?, ?, ?, NOW(), ?)
`

export function getLastPrintSql(prefix: string) {
    return `
        SELECT est_id
        FROM estampa
        WHERE est_id like '${prefix}%'
        ORDER BY est_id DESC
        LIMIT 1
    `
}