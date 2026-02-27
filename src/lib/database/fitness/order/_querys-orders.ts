import {insertProducts} from "@/lib/database/fitness/order/insert-products.js";
import {insertOrder} from "@/lib/database/fitness/order/insert-order.js";
import {deleteProducts} from "@/lib/database/fitness/order/delete-products.js";
import {Pool} from "mysql2/promise";
import {InsertFitOrder} from "@plugins/interface.js";
import {TiendanubeProduct} from "@api/tiendanube/interfaces.js";

export const querysOrders = (pool: Pool) => ({
    insertOrder: (order: InsertFitOrder) => insertOrder(order, pool),
    insertProducts: (products: TiendanubeProduct[], pedido_id: number) => insertProducts(products, pedido_id, pool),
    deleteProducts: (pedido_id: string | number) => deleteProducts({pedido_id, pool}),
})