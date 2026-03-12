export const selectChangerProductsSql = (table: "vitrine" | "catalogo") => `
    WITH base AS (SELECT p.prod_id,
                         p.nome AS name,
                         p.sku,
                         p.img,
                         p.tamanho,
                         p.promocao,
                         p.preco,
                         p.cor_id,
                         p.mul_id,
                         p.inf_id,
                         i.tipo,
                         c.estoque,
                         c.novidade,
                         c.destaque,
                         c.reposicao,
                         c.prioridade
                  FROM produto p
                           LEFT JOIN ${table} c ON p.prod_id = c.produto_id
                           LEFT JOIN inferior i ON p.inf_id = i.inf_id
                  WHERE p.img IS NOT NULL
                    AND p.img <> '[]')
    SELECT b.prod_id,
           b.name,
           b.sku,
           b.img,
           b.tamanho,
           b.promocao,
           b.preco,
           b.tipo,
           b.estoque,
           b.novidade,
           b.destaque,
           b.reposicao,
           b.prioridade,
           cr.nome as cor
    FROM base b
             JOIN cor cr ON b.cor_id = cr.cor_id
    WHERE b.cor_id IS NOT NULL
    ORDER BY name;
`;
