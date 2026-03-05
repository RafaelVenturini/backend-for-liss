import {Pool} from "mysql2/promise";
import {updateIdSql} from "@/lib/database/fitness/changer/sql/update.js";
import {ChangerColor} from "@/lib/database/fitness/changer/types/changer-interfaces.js";

interface Props extends ChangerColor {
    pool: Pool;
}

export const updateColor = async ({table, color, pool}: Props) => {
    let err = null
    try {
        const update = [color.stock, color.newer, color.highlight, color.reposition, color.id]
        const sql = updateIdSql(table)
        await pool.execute(sql, update)
    } catch (e) {
        console.error(e)
        err = e
    }

    return err
}
