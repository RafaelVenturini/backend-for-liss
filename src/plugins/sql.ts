import {onDuplicatedKeyUpdate} from "@/lib/string/database.js";

export const insertCustomerSql = `
    INSERT INTO cliente(cliente_id,
                        nome,
                        dia_cadastro,
                        telefone,
                        email,
                        nuvem_id)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE nome     = VALUES(nome),
                            telefone = VALUES(telefone),
                            email    = VALUES(email)
`

export const selectAddressSql = `
    SELECT endereco_id
    FROM endereco
    WHERE cliente_id = ?
      AND cep = ?
    LIMIT 1
`

export const insertAddresSql = `
    INSERT INTO endereco(cliente_id, cep, rua, numero, complemento, bairro,
                         cidade, estado, pais, criacao)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`

export const insertOrderSql = `
    INSERT INTO pedido(pedido_id, endereco_id, cliente_id, frete,
                       subtotal, desconto, total, entregadora,
                       tipo_entrega, plataforma, cod_rastreio,
                       data_pedido, metodo_pagamento, bandeira,
                       parcelamento, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ${onDuplicatedKeyUpdate([
                "endereco_id",
                "cliente_id",
                "frete",
                "subtotal",
                "desconto",
                "total",
                "entregadora",
                "tipo_entrega",
                "plataforma",
                "cod_rastreio",
                "data_pedido",
                "metodo_pagamento",
                "bandeira",
                "parcelamento",
                "status"
            ])}
`

export const insertOrderProductSql = `
    INSERT INTO pedido_produto(pedido_id, tiny_id, qntd)
    VALUES (?,
            (select tiny_id from produto where sku = ? limit 1),
            ?)
    ON DUPLICATE KEY UPDATE qntd=values(qntd)
`

export const deleteOrderProductSql = `
    DELETE
    FROM pedido_produto
    WHERE pedido_id = ?
`

export const insertProductSql = `
    INSERT INTO produto(tiny_id, criacao, nome, sku, preco, blu_id, inf_id,
                        top_id,
                        tec_id, tamanho, cor_id, mul_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE ${onDuplicatedKeyUpdate(["criacao", "nome", "sku", "preco", "blu_id",
        "inf_id", "top_id", "tec_id", "tamanho", "cor_id", "mul_id",])}
`