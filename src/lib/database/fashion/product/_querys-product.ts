import {Pool} from "mysql2/promise";
import {selectLastPrint} from "@/lib/database/fashion/product/select-last-print.js";
import {InsertPrint, InsertReference} from "@/types/interface/fashion/product-creator.js";
import {insertPrint} from "@/lib/database/fashion/product/insert-print.js";
import {insertReference} from "@/lib/database/fashion/product/insert-reference.js";
import {selectReactPrint} from "@/lib/database/fashion/product/select-print.js";
import {selectReactCloths} from "@/lib/database/fashion/product/select-cloth.js";
import {selectReactReference} from "@/lib/database/fashion/product/select-reference.js";
import {selectReactCategorys} from "@/lib/database/fashion/product/select-category.js";

export const querysProduct = (pool: Pool) => ({
    selectLastPrint: (hex: string) => selectLastPrint(hex, pool),
    insertPrint: (item: InsertPrint) => insertPrint(item, pool),
    insertReference: (item: InsertReference) => insertReference(item, pool),
    selectReactPrint: selectReactPrint(pool),
    selectReactCloths: selectReactCloths(pool),
    selectReactReference: selectReactReference(pool),
    selectReactCategorys: selectReactCategorys(pool),
})