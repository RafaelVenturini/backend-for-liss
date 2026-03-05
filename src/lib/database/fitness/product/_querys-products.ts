import {insertProduct} from "@/lib/database/fitness/product/insert-product.js";
import {selectProduct} from "@/lib/database/fitness/product/select-product.js";
import {selectBrokenImg} from "@/lib/database/fitness/product/select-broken-img.js";
import {selectCloths} from "@/lib/database/fitness/product/select-cloths.js";
import {insertFitnessColor} from "@/lib/database/fitness/product/insert-color.js";
import {selectLastColor} from "@/lib/database/fitness/product/select-last-color.js";
import {selectNew} from "@/lib/database/fitness/product/select-new.js";
import {Pool} from "mysql2/promise";
import {OneProduct} from "@api/tiny/interfaces.js";
import {selectTinyId} from "@/lib/database/fitness/product/select-tiny-id.js";


export const querysProducts = (pool: Pool) => ({
    insert: (product: OneProduct) => insertProduct(product, pool),
    select: (tinyId: string | null, sku: string | null) => selectProduct(tinyId, sku, pool),
    selectTinyId: (color: number) => selectTinyId(color, pool),
    selectBrokenImg: () => selectBrokenImg(pool),
    selectCloths: () => selectCloths(pool),
    insertFitnessColor: (name: string, sku: number) => insertFitnessColor(name, sku, pool),
    selectLastColor: () => selectLastColor(pool),
    selectNew: (ids: string[]) => selectNew(ids, pool),
})
