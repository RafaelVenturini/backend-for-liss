import {RouteHandlerMethod} from "fastify";
import {getOrder} from "@api/tiendanube/order.js";
import {cashBack, cashbackValityDays} from "@/lib/util/busines-rules.js";
import {calculateDate} from "@/lib/string/date.js";
import {
	createCoupon,
	deleteCoupon,
	getCoupon,
	updateCoupon
} from "@api/tiendanube/coupon.js";
import {toBLR} from "@/lib/string/money.js";


const postOrder: RouteHandlerMethod = async (request, reply) => {
	const {id, event} = request.body as any
	
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
		const customerData = await request.server.db.insertFitnessCustomer(customer)
		
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
			pagamento: data.payment_status,
		}
		const products = data.products
		await request.server.db.insertFitnessOrder(order)
		await request.server.db.insertFitnessOrderProducts(products, order.pedido_id)
		
		if (data.payment_status === 'paid') {
			const customerName = data.customer.name.split(' ')[0]
			const orderNumber = data.number
			const couponCode = `CB${customerName}${orderNumber}`
			const discount = (Number(data.total) - Number(data.subtotal) * cashBack).toFixed(2)
			const startDate = new Date()
			const vality = calculateDate(new Date(), cashbackValityDays)
			
			const couponItens = {
				couponCode,
				discount,
				startDate,
				vality,
			}
			let couponSearch
			let couponId
			
			switch (event) {
				case 'order/created':
					await createCoupon(couponItens)
					request.server.mailer.send('new-coupon',
						'Cupom de Cashback exclusivo!',
						customer.email,
						{
							discount: toBLR(couponItens.discount),
							coupon: couponItens.couponCode,
							vality: (couponItens.vality).toLocaleDateString('pt-BR', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})
						}
					)
					return reply.status(201).send({data: couponItens})
				case 'order/cancelled':
					couponSearch = await getCoupon(orderNumber)
					if (!couponSearch[0]) return reply.status(404).send({error: 'Coupon not found'})
					couponId = couponSearch[0].id
					if (!couponId) return reply.status(404).send({error: 'Coupon not found'})
					await deleteCoupon(couponId)
					request.server.mailer.send('deleted-coupon',
						'Cupom deletado por cancelamento de pedido',
						customer.email,
						{
							discount: toBLR(couponItens.discount),
							coupon: couponItens.couponCode,
							vality: (couponItens.vality).toLocaleDateString('pt-BR', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})
						}
					)
					
					return reply.status(204).send({data: 'Coupon deleted successfully'})
				case 'order/updated':
				case 'order/edited':
					couponSearch = await getCoupon(orderNumber)
					if (couponSearch.length === 0 || !couponSearch[0].id) {
						await createCoupon(couponItens)
						request.server.mailer.send('new-coupon',
							'Cupom de Cashback exclusivo!',
							customer.email,
							{
								discount: toBLR(couponItens.discount),
								coupon: couponItens.couponCode,
								vality: (couponItens.vality).toLocaleDateString('pt-BR', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})
							}
						)
						return reply.status(201).send({data: couponItens})
					}
					couponId = couponSearch[0].id
					const resp = await updateCoupon(couponId, couponItens)
					if (!resp) return reply.status(404).send({error: 'Coupon not found'})
					return reply.status(201).send({data: resp})
				default:
					return reply.status(204).send({data: 'No action'})
			}
		}
		
		return reply.status(201).send({data: order})
	} catch (e) {
		return reply.status(500).send({error: e})
	}
}

export default postOrder;

