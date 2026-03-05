import {Pool} from "mysql2/promise";
import {querysProduct} from "@/lib/database/fashion/product/_querys-product.js";

export const fashion = (pool: Pool) => ({
    product: querysProduct(pool)
})
