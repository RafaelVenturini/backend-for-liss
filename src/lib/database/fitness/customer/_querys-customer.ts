import {insertCustomer} from "@/lib/database/fitness/customer/insert.js";
import {selectReposition} from "@/lib/database/fitness/customer/select-reposition.js";
import {Pool} from "mysql2/promise";
import {InsertFitUser} from "@plugins/interface.js";

export const querysCustomer = (pool: Pool) => ({
    insert: (customer: InsertFitUser) => insertCustomer(customer, pool),
    selectReposition: (id: string[]) => selectReposition(id, pool)
})