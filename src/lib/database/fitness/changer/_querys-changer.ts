import {selectChanger} from "@/lib/database/fitness/changer/select.js";
import {Pool} from "mysql2/promise";
import {updateColor} from "@/lib/database/fitness/changer/update-color.js";
import {ChangerColor, ChangerProduct} from "@/lib/database/fitness/changer/types/changer-interfaces.js";
import {updateProduct} from "@/lib/database/fitness/changer/update-products.js";


export const querysChanger = (pool: Pool) => ({
    select: (table: "catalogo" | "vitrine") => selectChanger(table, pool),
    updateColor: ({color, table}: ChangerColor) => updateColor({color, table, pool}),
    updateProduct: ({product, table}: ChangerProduct) => updateProduct({product, table, pool}),
});
