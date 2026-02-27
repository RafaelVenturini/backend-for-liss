import {TiendanubeProduct} from "@api/tiendanube/interfaces.js";
import {Pool} from "mysql2/promise";
import {deleteProducts} from "@/lib/database/fitness/order/delete-products.js";
import {insertSql} from "@/lib/database/fitness/order/sql/order-products.js";


export const insertProducts = async (
    products: TiendanubeProduct[],
    pedido_id: number,
    pool: Pool,
) => {
    await deleteProducts({pedido_id, pool});
    const err = [];
    for (const product of products) {
        try {
            if (!product.quantity) continue;
            if (!isNaN(Number(product.sku))) continue;
            const insert = [pedido_id, product.sku, product.quantity];
            await pool.execute(insertSql, insert);
        } catch (e) {
            // @ts-ignore
            err.push({err: e.sqlMessage, product: product.sku});
        }
    }
    return err;
};