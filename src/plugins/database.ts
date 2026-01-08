import fp from 'fastify-plugin';
import {createPool, Pool} from "mysql2/promise";
import {appConfig} from "@config";
import {FastifyInstance} from "fastify";
import {
	InsertFitAddress,
	InsertFitOrder,
	InsertFitUser
} from "@plugins/interface.js";
import {
	deleteOrderProductSql,
	insertAddresSql,
	insertCustomerSql,
	insertOrderProductSql,
	insertOrderSql,
	selectAddressSql
} from "@plugins/sql.js";
import {databaseDate} from "@/lib/string/date.js";
import {TiendanubeProduct} from "@api/tiendanube/interfaces.js";

async function databasePlugin(fastify: FastifyInstance) {
	const fitnessPool = createPool(appConfig.databases.fitness)
	const fashionPool = createPool(appConfig.databases.fashion)
	const toolPool = createPool(appConfig.databases.tools)
	
	const insertFitnessCustomer = async (customer: InsertFitUser) => {
		const {
			cliente_id,
			nome,
			dia_cadastro,
			telefone,
			email,
			nuvem_id,
		} = customer
		
		const insert = [cliente_id, nome, databaseDate(dia_cadastro), telefone, email, nuvem_id]
		
		return fitnessPool.execute(insertCustomerSql, insert);
	}
	
	const insertFitnessAddress = async (address: InsertFitAddress) => {
		const {
			cliente_id,
			cep,
			rua,
			numero,
			complemento,
			bairro,
			cidade,
			estado,
			pais,
			criacao,
		} = address
		
		const [select] = await fitnessPool.execute(selectAddressSql, [cliente_id, cep])
		// @ts-ignore
		if (select.length === 1) return select[0].endereco_id
		const insert = [cliente_id, cep, rua, numero, complemento, bairro, cidade, estado, pais, databaseDate(criacao)]
		
		const [inserted] = await fitnessPool.execute(insertAddresSql, insert)
		// @ts-ignore
		return inserted[0].endereco_id
	}
	
	const insertFitnessOrder = async (order: InsertFitOrder) => {
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
		} = order
		
		const insert = [pedido_id, endereco_id, cliente_id, frete, subtotal, desconto, total, entregadora, tipo_entrega, plataforma, cod_rastreio, databaseDate(data_pedido), metodo_pagamento, bandeira, parcelamento, status]
		
		return fitnessPool.execute(insertOrderSql, insert);
	}
	
	const insertFitnessOrderProducts = async (products: TiendanubeProduct[], pedido_id: number) => {
		await fitnessPool.execute(deleteOrderProductSql, [pedido_id])
		console.log('Products deleted')
		for (const product of products) {
			console.log(product.sku)
			if (!product.quantity) continue;
			if (!isNaN(Number(product.sku))) continue;
			const insert = [pedido_id, product.sku, product.quantity]
			await fitnessPool.execute(insertOrderProductSql, insert)
		}
	}
	
	// const insertFitnessProduct = async (product: OneProduct) => {
	//
	// }
	
	fastify.decorate('insertFitnessOrderProducts', insertFitnessOrderProducts)
	
	fastify.decorate('db', {
		fitness: fitnessPool,
		fashion: fashionPool,
		tool: toolPool,
		insertFitnessCustomer,
		insertFitnessAddress,
		insertFitnessOrder,
		insertFitnessOrderProducts,
	})
	
	fastify.addHook('onClose', async () => {
		await Promise.all([fitnessPool.end(), fashionPool.end(), toolPool.end()]);
		fastify.log.info('Database connection closed.');
	})
}

declare module 'fastify' {
	interface FastifyInstance {
		db: {
			fitness: Pool;
			fashion: Pool;
			tool: Pool;
			insertFitnessCustomer: (customer: InsertFitUser) => Promise<any>;
			insertFitnessAddress: (address: InsertFitAddress) => Promise<any>;
			insertFitnessOrder: (order: InsertFitOrder) => Promise<any>;
			insertFitnessOrderProducts: (products: TiendanubeProduct[], pedido_id: number) => Promise<any>;
		};
	}
}

export default fp(databasePlugin);