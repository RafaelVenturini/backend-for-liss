import {
	getCustomer,
	getCustomerByIdentification
} from "@api/tiendanube/customer.js";

interface InsertCustomer {
	code: number,
	error?: string,
	data?: any
}

export async function insertCustomer(id?: number | string | null, identification?: string | number | null): Promise<InsertCustomer> {
	if (!id && !identification) return ({
		code: 400,
		error: 'Missing customer identification'
	})
	let data
	if (id) {
		id = Number(id)
		data = await getCustomer(id)
	} else {
		identification = String(identification)
		data = await getCustomerByIdentification(identification)
	}
	
	if (!data.identification) return {
		code: 404,
		error: 'Customer has no identification (CPF/CNPJ)'
	}
	if (!data) return {
		code: 404,
		error: 'Customer not found'
	}
	const insert = {
		cliente_id: data.identification,
		nome: data.name,
		dia_cadastro: data.created_at,
		telefone: data.phone,
		nuvem_id: data.id,
		email: data.email
	}
	
	console.log('Customer insert: ', insert)
	return {
		code: 200,
		data: insert
	}
}