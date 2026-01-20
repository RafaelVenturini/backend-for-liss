import fp from 'fastify-plugin';
import {createPool, ResultSetHeader} from "mysql2/promise";
import {appConfig} from "@config";
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {
	ClothsResult,
	fixImgResult,
	InsertFitAddress,
	InsertFitOrder,
	InsertFitUser
} from "@plugins/interface.js";
import {
	deleteOrderProductSql,
	insertAddresSql,
	insertColorSql,
	insertCustomerSql,
	insertLogSql,
	insertMultColorSql,
	insertOrderProductSql,
	insertOrderSql,
	insertProductSql,
	selectAddressSql,
	selectBrokenImgSql,
	selectClothSql,
	selectLastColorSql,
	selectProductSql
} from "@plugins/sql.js";
import {databaseDate} from "@/lib/string/date.js";
import {TiendanubeProduct} from "@api/tiendanube/interfaces.js";
import {OneProduct} from "@api/tiny/interfaces.js";
import {segmentOfSku} from "@/lib/objects/segment-of-sku.js";
import {tinyAnexos} from "@/lib/string/products.js";
import {
	insertCustomer
} from "@/lib/functions/nuvemshop/insert-customer.js";

async function databasePlugin(fastify: FastifyInstance) {
	const fitnessPool = createPool(appConfig.databases.fitness)
	const fashionPool = createPool(appConfig.databases.fashion)
	const toolPool = createPool(appConfig.databases.tools)
	
	///
	/// Fitness Query's
	///
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
		
		try {
			const data = await fitnessPool.execute(insertCustomerSql, insert);
			return {data}
		} catch (e) {
			console.log({error: e, insert})
			return {error: {reason: e, insert}}
		}
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
		
		const selectParam = [cliente_id, cep]
		
		const [select] = await fitnessPool.execute(selectAddressSql, selectParam)
		// @ts-ignore
		if (select.length === 1) return select[0].endereco_id
		const insert = [cliente_id, cep, rua, numero, complemento, bairro, cidade, estado, pais, databaseDate(criacao)]
		try {
			const [inserted] = await fitnessPool.execute<ResultSetHeader>(insertAddresSql, insert)
			return inserted.insertId
		} catch (e: any) {
			console.log({error: e, insert, select})
			if (e.errno === 1216) {
				const insertedCustomer = await insertCustomer(null, cliente_id)
				if (insertedCustomer.code > 300 || !insertedCustomer.data) {
					console.log({error: e, insertedCustomer})
					return {error: {reason: e, insertedCustomer}}
				}
				await insertFitnessCustomer(insertedCustomer.data)
				const [inserted] = await fitnessPool.execute<ResultSetHeader>(insertAddresSql, insert)
				return inserted.insertId
			}
			
			return {error: {reason: e, insert, select}}
		}
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
		
		try {
			return fitnessPool.execute(insertOrderSql, insert);
		} catch (e) {
			console.log({error: e, insert})
			return {error: {reason: e, insert}}
		}
	}
	
	const insertFitnessOrderProducts = async (products: TiendanubeProduct[], pedido_id: number) => {
		await fitnessPool.execute(deleteOrderProductSql, [pedido_id])
		const err = []
		for (const product of products) {
			try {
				
				if (!product.quantity) continue;
				if (!isNaN(Number(product.sku))) continue;
				const insert = [pedido_id, product.sku, product.quantity]
				await fitnessPool.execute(insertOrderProductSql, insert)
			} catch (e) {
				// @ts-ignore
				err.push({err: e.sqlMessage, product: product.sku})
			}
		}
		return err;
	}
	
	const insertFitnessProduct = async (product: OneProduct) => {
		const {id, nome, codigo, preco, anexos} = product
		const x = segmentOfSku(codigo, nome)
		if (x === null) return
		const insert = [id, databaseDate(new Date()), nome, codigo, preco, x.blu, x.inf, x.top, x.tec, x.tam, x.cor, x.mul, tinyAnexos(anexos)]
		
		try {
			await fitnessPool.execute(insertProductSql, insert)
		} catch (e) {
			console.log({error: e, insert})
			return {error: {reason: e, insert}}
		}
	}
	
	const selectFitnessProduct = async (tinyId: string | null, sku: string | null) => {
		if (!tinyId && !sku) return null
		if (!tinyId) tinyId = null
		if (!sku) sku = null
		
		const [rows] = await fitnessPool.execute(selectProductSql, [tinyId, sku])
		
		return rows
	}
	
	const selectFitnessBrokenImg = async (): Promise<fixImgResult[]> => {
		const [rows] = await fitnessPool.execute<fixImgResult[]>(selectBrokenImgSql)
		return rows
	}
	
	const selectFitnessCloths = async (): Promise<ClothsResult[] | null> => {
		const [rows] = await fitnessPool.execute<ClothsResult[]>(selectClothSql)
		return rows
	}
	
	const insertFitnessColor = async (name: string, sku: number) => {
		const solid = name.includes('Bicolor') || name.includes('Tricolor')
		try {
			if (solid) await fitnessPool.execute(insertColorSql, [sku, name, databaseDate(new Date())])
			else await fitnessPool.execute(insertMultColorSql, [sku, name, databaseDate(new Date())])
		} catch (e: any) {
			if (e.code === 'ER_DUP_ENTRY') {
				console.log('Tentativa de adicionar cor já existente')
				return {error: 'Color already exists'}
			}
			console.log(e)
			return {error: e}
		}
	}
	
	const selectLastColor = async () => {
		const [rows] = await fitnessPool.execute(selectLastColorSql)
		return rows
	}
	
	const selectNonCreated = async (ids: string[]) => {
		if (ids.length === 0) return []
		const search = ids.map(id => `ROW(${id})`).join(', ');
		const [rows] = await fitnessPool.execute<ClothsResult[]>(`
            SELECT lista.id
            FROM (VALUES ${search}) AS lista(id)
                     LEFT JOIN produto ON lista.id = tiny_id
            WHERE tiny_id IS NULL;
		`)
		return rows.map(row => row.id)
	}
	
	///
	/// Fashion Query's
	///
	
	
	///
	/// Tools Query's
	///
	const insertLog = async (req: FastifyRequest, rep: FastifyReply, error: any | null) => {
		const errorResp = error instanceof Error
			? error.message
			: (error ? String(error) : null);
		const data = {
			endpoint: req.url,
			body: req.body ? JSON.stringify(req.body) : null,
			status: rep.statusCode,
			error: errorResp,
			method: req.method,
			startDate: req.startDate,
			duration: new Date().getTime() - req.startDate.getTime(),
			enviroment: process.env.NODE_ENV || 'prod'
		}
		
		const insert = [data.endpoint, data.body, data.status, data.error, data.method, data.startDate, data.duration, data.enviroment]
		if (data.endpoint.includes('/docs')) return
		
		try {
			await toolPool.execute(insertLogSql, insert)
		} catch (e) {
			console.error("Critical error: ", e)
		}
	}
	
	fastify.decorate('insertFitnessOrderProducts', insertFitnessOrderProducts)
	
	fastify.decorate('db', {
		fitness: fitnessPool,
		fashion: fashionPool,
		tool: toolPool,
		insertFitnessCustomer,
		insertFitnessAddress,
		insertFitnessOrder,
		insertFitnessOrderProducts,
		insertFitnessProduct,
		selectFitnessProduct,
		selectFitnessBrokenImg,
		selectFitnessCloths,
		insertFitnessColor,
		selectLastColor,
		insertLog,
		selectNonCreated
	})
	
	fastify.addHook('onClose', async () => {
		await Promise.all([fitnessPool.end(), fashionPool.end(), toolPool.end()]);
		fastify.log.info('Database connection closed.');
	})
}


export default fp(databasePlugin);