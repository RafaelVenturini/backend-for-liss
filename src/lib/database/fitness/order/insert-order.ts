import {InsertFitOrder} from "@plugins/interface.js";
import {databaseDate} from "@/lib/string/date.js";
import {insertSql} from "@/lib/database/fitness/order/sql/insert-order.js";
import {Pool} from "mysql2/promise";

export const insertOrder = async (order: InsertFitOrder, pool: Pool) => {
    const {
        pedido_id,
        endereco_id,
        cliente_id,
        frete,
        subtotal,
        desconto,
        total,
        entregadora,
        tipo_entrega,
        plataforma,
        cod_rastreio,
        data_pedido,
        metodo_pagamento,
        bandeira,
        parcelamento,
        status,
    } = order;

    const insert = [
        pedido_id,
        endereco_id,
        cliente_id,
        frete,
        subtotal,
        desconto,
        total,
        entregadora,
        tipo_entrega,
        plataforma,
        cod_rastreio,
        databaseDate(data_pedido),
        metodo_pagamento,
        bandeira,
        parcelamento,
        status,
    ];

    try {
        return pool.execute(insertSql, insert);
    } catch (e) {
        console.log({error: e, insert});
        return {error: {reason: e, insert}};
    }
};