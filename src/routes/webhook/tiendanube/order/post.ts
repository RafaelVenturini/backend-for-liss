import {RouteHandlerMethod} from "fastify";
import {getOrder} from "@api/tiendanube/order.js";


const postOrder: RouteHandlerMethod = async (request, reply) => {
	const {id} = request.body as any
	
	try {
		const data = await getOrder(id)
		if (!data.id || !data) return reply.status(404).send(
			{success: false, error: 'Order not found'}
		)
		
		const customer = {
			cliente_id: data.customer.identification,
			nome: data.customer.name,
			dia_cadastro: data.customer.created_at,
			telefone: data.customer.phone,
			email: data.customer.email,
			nuvem_id: data.customer.id,
		}
		await request.server.db.insertFitnessCustomer(customer)
		const address = {
			cliente_id: data.customer.identification,
			cep: data.customer.default_address.zipcode,
			rua: data.customer.default_address.address,
			numero: data.customer.default_address.number,
			complemento: data.customer.default_address.floor,
			bairro: data.customer.default_address.locality,
			cidade: data.customer.default_address.city,
			estado: data.customer.default_address.province,
			pais: data.customer.default_address.country,
			criacao: data.customer.default_address.created_at,
		}
		const addressId = await request.server.db.insertFitnessAddress(address)
		
		const order = {
			pedido_id: data.number,
			endereco_id: addressId,
			cliente_id: customer.cliente_id,
			frete: data.shipping_cost_customer,
			subtotal: data.subtotal,
			desconto: data.discount,
			total: data.total,
			plataforma: data.storefront,
			entregadora: data.fulfillments[0].shipping.carrier.name,
			tipo_entrega: data.fulfillments[0].shipping.option.name,
			cod_rastreio: data.fulfillments[0].tracking_info.code,
			data_pedido: data.created_at,
			metodo_pagamento: data.payment_details.method,
			bandeira: data.payment_details.credit_card_company,
			parcelamento: data.payment_details.installments,
			status: data.status,
		}
		const products = data.products
		await request.server.db.insertFitnessOrder(order)
		await request.server.db.insertFitnessOrderProducts(products, order.pedido_id)
		
		return reply.status(201).send({data: order})
	} catch (e) {
		return reply.status(500).send({error: e})
	}
}

export default postOrder;