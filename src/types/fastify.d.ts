import 'fastify';
import {Pool} from "mysql2/promise";
import {
	InsertFitAddress,
	InsertFitOrder,
	InsertFitUser
} from "@plugins/interface.js";
import {TiendanubeProduct} from "@api/tiendanube/interfaces.js";
import {OneProduct} from "@api/tiny/interfaces.js";
import {QueryResult} from "mysql2";
import {FastifyReply} from "fastify";

declare module 'fastify' {
	interface FastifyRequest {
		startDate: Date;
		executionError?: any
	}
}

declare module 'fastify' {
	interface FastifyInstance {
		mailer: {
			send: (templateName: string, subject: string, to: string, data: any) => Promise<any>
		}
	}
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
			insertFitnessProduct: (product: OneProduct) => Promise<any>;
			selectFitnessProduct: (tinyId: string | null, sku: string | null) => Promise<QueryResult | null>;
			selectFitnessBrokenImg: () => Promise<QueryResult | null>;
			selectFitnessCloths: () => Promise<QueryResult | null>;
			insertFitnessColor: (name: string, sku: number) => Promise<any>;
			selectLastColor: () => Promise<QueryResult | null>;
			insertLog: (req: FastifyRequest, rep: FastifyReply, error: any | null) => Promise<any>;
			selectNonCreated: (ids: string[]) => Promise<number[] | null>;
		};
	}
}