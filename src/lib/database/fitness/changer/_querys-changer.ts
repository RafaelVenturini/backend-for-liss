import {selectChanger} from "@/lib/database/fitness/changer/select.js";
import {Pool} from "mysql2/promise";

export const querysChanger = (pool: Pool) => ({
    select: (table: "catalogo" | "vitrine") => selectChanger(table, pool),
    updateColor: null,
    updateProduct: null,
});
