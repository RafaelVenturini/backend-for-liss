import {appConfig} from "@config";
import {Order} from "./interfaces.js";

const url = 'https://api.tiendanube.com/v1/4820240/orders/'
const opt = {
	headers: appConfig.nuvemshop.headers,
	method: 'GET'
}


export async function getOrder(id: number) {
	const resp = await fetch(`${url}${id}/?aggregates=fulfillment_orders`, opt)
	const data: Order = await resp.json()
	return data
}