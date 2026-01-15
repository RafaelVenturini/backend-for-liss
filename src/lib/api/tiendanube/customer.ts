import {appConfig} from "@config";
import {Customer} from "./interfaces.js";

const url = 'https://api.tiendanube.com/v1/4820240/customers/'
const opt = {
	headers: appConfig.nuvemshop.headers,
	method: 'GET'
}

export async function getCustomer(id: number) {
	const resp = await fetch(`${url}${id}`, opt)
	const data: Customer = await resp.json()
	return data
}

export async function getCustomerByIdentification(identification: string) {
	const resp = await fetch(`${url}?q=${identification}`, opt)
	const data: Customer[] = await resp.json()
	return data[0]
}