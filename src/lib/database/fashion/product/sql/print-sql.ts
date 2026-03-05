export const selectPrintsSql = `
    SELECT CONCAT_WS(' - ', e.nome, est_id, t.nome) label,
           est_id                                   value,
           referencia                               img
    FROM ESTAMPA e
             JOIN tecido t on e.tec_id = t.tec_id
    ORDER BY value
`

export const insertPrintSql = `
    INSERT INTO estampa(est_id, nome, tec_id, referencia)
    VALUES (?, ?, ?, ?)
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