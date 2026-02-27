import {Pool} from "mysql2/promise";

const selectRepositionUsersToUpdateSql = `
    SELECT c.nuvem_id
    FROM pedido p
             JOIN liss_fitness.cliente c ON p.cliente_id = c.cliente_id
    WHERE c.nuvem_id IN (?)
    GROUP BY c.nuvem_id
    HAVING DATEDIFF(NOW(), MAX(p.data_pedido)) > 15
`

export const selectReposition = async (ids: string[], pool: Pool) => {
    const [rows] = await pool.execute(
        selectRepositionUsersToUpdateSql,
        ids,
    );
    console.log("reposition: ", ids);
    return rows;
};