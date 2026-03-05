import {deleteSql} from "@/lib/database/fitness/order/sql/order-products.js";
import {Pool} from "mysql2/promise";

interface Props {
    pool: Pool;
    pedido_id: string | number;
}

export const deleteProducts = async ({pool, pedido_id}: Props) => {
    await pool.execute(deleteSql, [pedido_id])
}