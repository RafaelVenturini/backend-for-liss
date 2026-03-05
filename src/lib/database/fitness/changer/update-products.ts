import {Pool} from "mysql2/promise";
import {ChangerProduct} from "@/lib/database/fitness/changer/types/changer-interfaces.js";
import {updatePrioritySql, updateSaleSql} from "@/lib/database/fitness/changer/sql/update.js";

interface Props extends ChangerProduct {
    pool: Pool;
}

export const updateProduct = async ({table, product, pool}: Props) => {
    let err = null
    try {
        const ids = product.colors.map(x => x.id)

        const prioSQL = updatePrioritySql(table)
        const prioIns = [product.priority, ids]

        const saleSQL = updateSaleSql

        const prodSale = product.sale > 20 ? product.sale : null;
        const saleIns = [prodSale, ids]


        await pool.query(prioSQL, prioIns)
        await pool.query(saleSQL, saleIns)

    } catch (e) {
        console.error(e)
        err = e
    }

    return err
}
