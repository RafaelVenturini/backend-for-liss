export const insertLogSql = `
    INSERT INTO backend_logs(endpoint, body, status, error, method,
                             start_time, duration, environment)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`