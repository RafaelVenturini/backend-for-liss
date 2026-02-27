import {InsertFitUser} from "@plugins/interface.js";
import {databaseDate} from "@/lib/string/date.js";
import {Pool} from "mysql2/promise";

const insertSql = `
    INSERT INTO cliente(cliente_id,
                        nome,
                        dia_cadastro,
                        telefone,
                        email,
                        nuvem_id)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE nome     = VALUES(nome),
                            telefone = VALUES(telefone),
                            email    = VALUES(email)
`

export const insertCustomer = async (customer: InsertFitUser, pool: Pool) => {
    const {cliente_id, nome, dia_cadastro, telefone, email, nuvem_id} =
        customer;

    const insert = [
        cliente_id,
        nome,
        databaseDate(dia_cadastro),
        telefone,
        email,
        nuvem_id,
    ];

    try {
        const data = await pool.execute(insertSql, insert);
        return {data};
    } catch (e) {
        console.log({error: e, insert});
        return {error: {reason: e, insert}};
    }
};
