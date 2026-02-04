import {appConfig} from "@config";

const url = "https://api.tiendanube.com/v1/4820240/products/price-tables/2622/customers/"

interface GetRepositionUsers {
    "total": number,
    "page": number,
    "price_table": {
        "id": string,
        "verification_code": string,
        "store_id": string,
        "name": string,
        "default_discount": string,
        "cart_minimum_price": string,
        "cart_minimum_quantity": number,
        "active": boolean,
        "created_at": string,
        "updated_at": string,
        "has_categories": boolean,
        "has_products_variants": boolean,
        "has_customers": boolean,
        "customers": Customer[]
    }
}

interface Customer {
    id: string
}

export async function createRepositionUser(id: number | string) {
    const opt = {
        headers: appConfig.nuvemshop.headers,
        method: "PUT",
        body: JSON.stringify([String(id)]),
    };
    return await fetch(url, opt)
}

export async function removeRepositionUser(id: number | string) {
    const opt = {
        headers: appConfig.nuvemshop.headers,
        method: "DELETE",
    };
    return await fetch(url + id, opt)
}

export async function getRepositionUsers(): Promise<GetRepositionUsers> {
    const opt = {
        headers: appConfig.nuvemshop.headers,
        method: "GET",
    };
    const data = await fetch(url, opt)
    return await data.json()
}