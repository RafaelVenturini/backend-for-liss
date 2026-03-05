import {appConfig} from "@config";
import {TiendanubeGetProducts} from "@api/tiendanube/interfaces.js";
import {percent} from "@/lib/util/percent.js";
import {sleep} from "@/lib/util/sleep.js";

let page = 1
const perpage = 200

const opt = {
    headers: appConfig.nuvemshop.headers,
    method: 'GET'
}

const data: TiendanubeGetProducts[] = []

export async function getTiendanubeGetProducts() {
    console.log('Fetching page:', page, "total itens:", data.length)
    const url = `https://api.tiendanube.com/v1/4820240/products?created_at_max=2025-09-16T00:00:00-03:00&per_page=${perpage}&page=${page}`
    const resp = await fetch(url, opt)
    const products: TiendanubeGetProducts[] = await resp.json()

    data.push(...products)
    if (products.length === 200) {
        page += 1
        await getTiendanubeGetProducts()
    }
}

export async function fixJessProblem() {
    await getTiendanubeGetProducts()
    console.log('All itens on hand, now filtering!')
    const filtred = data.filter(x => x.published)
    console.log('Fixing', filtred.length, 'itens')
    let i = 1
    let len = filtred.length
    for (const product of filtred) {
        console.log(`fixing product: ${product.name.pt} created at: ${product.created_at}${i}/${len} [${percent(i, len)}%]`)
        if (product.variants[0].stock === 0) {
            const categories = product.categories.map(x => String(x.id))
            categories.push("37118886")
            const body = JSON.stringify({"categories": categories})
            // console.log(body)
            const resp = await fetch(`https://api.tiendanube.com/v1/4820240/products/${product.id}`, {
                method: 'PUT',
                headers: appConfig.nuvemshop.headers,
                body,
            })
            await sleep(200)
        } else {
            console.log('no changes.')
        }
        i++
    }
}