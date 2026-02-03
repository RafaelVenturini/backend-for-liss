import {Order} from "@api/tiendanube/interfaces.js";

export interface ArrangedCustomer {
    cliente_id: string;
    nome: string;
    dia_cadastro: string;
    telefone: string;
    email: string;
    nuvem_id: number;
}

export async function arrangeOrder(x: Order, database: any) {
    const customer = {
        cliente_id: x.customer.identification,
        nome: x.customer.name,
        dia_cadastro: x.customer.created_at,
        telefone: x.customer.phone,
        email: x.customer.email,
        nuvem_id: x.customer.id,
    }

    const address = {
        cliente_id: x.customer.identification,
        cep: x.customer.default_address.zipcode,
        rua: x.customer.default_address.address,
        numero: x.customer.default_address.number,
        complemento: x.customer.default_address.floor,
        bairro: x.customer.default_address.locality,
        cidade: x.customer.default_address.city,
        estado: x.customer.default_address.province,
        pais: x.customer.default_address.country,
        criacao: x.customer.default_address.created_at,
    }
    const addressId = await database.insertFitnessAddress(address)

    const order = {
        pedido_id: x.number,
        endereco_id: addressId,
        cliente_id: customer.cliente_id,
        frete: x.shipping_cost_customer,
        subtotal: x.subtotal,
        desconto: x.discount,
        total: x.total,
        plataforma: x.storefront,
        entregadora: x.fulfillments[0].shipping.carrier.name,
        tipo_entrega: x.fulfillments[0].shipping.option.name,
        cod_rastreio: x.fulfillments[0].tracking_info.code,
        data_pedido: x.created_at,
        metodo_pagamento: x.payment_details.method,
        bandeira: x.payment_details.credit_card_company,
        parcelamento: x.payment_details.installments,
        status: x.status,
        pagamento: x.payment_status,
    }

    return {customer, order, address}
}