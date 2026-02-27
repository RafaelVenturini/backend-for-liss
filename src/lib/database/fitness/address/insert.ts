import {InsertFitAddress} from "@plugins/interface.js";
import {databaseDate} from "@/lib/string/date.js";
import {Pool, ResultSetHeader} from "mysql2/promise";
import {getCustomerData} from "@/lib/functions/nuvemshop/get-customer-data.js";
import {insertCustomer} from "@/lib/database/fitness/customer/insert.js";

const selectAddressSql = `
    SELECT endereco_id
    FROM endereco
    WHERE cliente_id = ?
      AND cep = ?
    LIMIT 1
`

const insertAddresSql = `
    INSERT INTO endereco(cliente_id, cep, rua, numero, complemento, bairro,
                         cidade, estado, pais, criacao)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`

export const insertAddress = async (address: InsertFitAddress, pool: Pool) => {
    const {
        cliente_id,
        cep,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        pais,
        criacao,
    } = address;

    const selectParam = [cliente_id, cep];

    const [select] = await pool.execute(selectAddressSql, selectParam);
    // @ts-ignore
    if (select.length === 1) return select[0].endereco_id;
    const insert = [
        cliente_id,
        cep,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        pais,
        databaseDate(criacao),
    ];
    try {
        const [inserted] = await pool.execute<ResultSetHeader>(
            insertAddresSql,
            insert,
        );
        return inserted.insertId;
    } catch (e: any) {
        console.log({error: e, insert, select});
        if (e.errno === 1216) {
            const insertedCustomer = await getCustomerData(null, cliente_id);
            if (insertedCustomer.code > 300 || !insertedCustomer.data) {
                console.log({error: e, insertedCustomer});
                return {error: {reason: e, insertedCustomer}};
            }
            await insertCustomer(insertedCustomer.data, pool);
            const [inserted] = await pool.execute<ResultSetHeader>(
                insertAddresSql,
                insert,
            );
            return inserted.insertId;
        }

        return {error: {reason: e, insert, select}};
    }
};