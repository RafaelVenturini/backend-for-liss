export function onDuplicatedKeyUpdate(v: string[]) {
	return `ON DUPLICATE KEY UPDATE ${v.map(i => `${i}=VALUES(${i})`).join(', ')}`
}

export function keyEqualQuery(keys: string[]) {
	return keys.map(i => `${i}=?`).join(', ')
}