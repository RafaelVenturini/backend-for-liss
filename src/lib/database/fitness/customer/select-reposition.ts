import {Pool, RowDataPacket} from "mysql2/promise";

const selectRepositionUsersToUpdateSql = `
    SELECT c.nuvem_id
    FROM cliente c
             LEFT JOIN pedido p ON p.cliente_id = c.cliente_id
    WHERE c.nuvem_id IN (?)
    GROUP BY c.nuvem_id
    HAVING MAX(p.data_pedido) IS NULL
        OR DATEDIFF(NOW(), MAX(p.data_pedido)) > 15
`

interface Query extends RowDataPacket {
    nuvem_id: string
}

export const selectReposition = async (ids: string[], pool: Pool) => {
    const placeholders = ids.map(() => '?').join(',');
    const [rows] = await pool.query<Query[]>(
        selectRepositionUsersToUpdateSql.replace('IN (?)', `IN (${placeholders})`),
        ids
    );
    return rows;
};