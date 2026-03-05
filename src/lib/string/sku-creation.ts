export function skuWithoutColor(sku: string, name: string) {
    let sufix = '-'
    let skuCut = sku
    if (name.includes('Bicolor')) sufix += 'BIC'
    if (name.includes('tricolor')) sufix += 'TRI'

    if (isNaN(Number(skuCut))) {
        skuCut = skuCut.slice(0, -4)
    }
    return `${skuCut}${sufix != '-' ? sufix : ''}`
}