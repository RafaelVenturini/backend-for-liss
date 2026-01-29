export const insertCustomerSql = `
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