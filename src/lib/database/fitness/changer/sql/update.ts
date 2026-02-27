export const updateIdSql = `
    UPDATE ?
    SET ?
    WHERE produto_id = ?
`;

export const updateSaleSql = (sku: string) => `
    UPDATE produto
    SET promocao = ?
    WHERE sku LIKE "${sku}%"`;

export const updatePrioritySql = (sku: string) => `
    UPDATE ?
    SET prioridade = ?
    WHERE sku LIKE "${sku}%"`;
