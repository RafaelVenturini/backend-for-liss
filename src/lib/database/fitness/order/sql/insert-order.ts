import {onDuplicatedKeyUpdate} from "@/lib/string/database.js";

export const insertSql = `
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