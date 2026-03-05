export const updateIdSql = (table: 'catalogo' | 'vitrine') => `
    UPDATE ${table}
    SET estoque   = ?,
        novidade  = ?,
        destaque  = ?,
        reposicao = ?
    WHERE produto_id = ?
`;

export const updateSaleSql = `
    UPDATE produto
    SET promocao = ?
    WHERE prod_id IN (?)
`

export const updatePrioritySql = (table: 'catalogo' | 'vitrine') => `
    UPDATE ${table} t
    SET t.prioridade = ?
    WHERE produto_id IN (?)
`
