import {querysCustomer} from "@/lib/database/fitness/customer/_querys-customer.js";
import {querysAddress} from "@/lib/database/fitness/address/_querys-address.js";
import {querysProducts} from "@/lib/database/fitness/product/_querys-products.js";
import {querysChanger} from "@/lib/database/fitness/changer/_querys-changer.js";
import {Pool} from "mysql2/promise";
import {querysOrders} from "@/lib/database/fitness/order/_querys-orders.js";

export const fitness = (pool: Pool) => ({
    customer: querysCustomer(pool),
    address: querysAddress(pool),
    product: querysProducts(pool),
    changer: querysChanger(pool),
    order: querysOrders(pool)
})