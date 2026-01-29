const maxSkuLeng = 3

export function skuIncrease(sku: string | number) {
    sku = String(sku)
    const prefix = isNaN(Number(sku[0])) ? sku[0] : ""

    let newNum = String(Number(sku.replace(prefix, "")) + 1)
    for (let i = newNum.length; i < maxSkuLeng; i++) {
        newNum = "0" + newNum
    }


    return prefix + newNum
}