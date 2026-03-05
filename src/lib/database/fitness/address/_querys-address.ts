import {insertAddress} from "@/lib/database/fitness/address/insert.js";
import {Pool} from "mysql2/promise";
import {InsertFitAddress} from "@plugins/interface.js";

export const querysAddress = (pool: Pool) => ({
    insert: (data: InsertFitAddress) => insertAddress(data, pool),
})