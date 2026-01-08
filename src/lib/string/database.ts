export function onDuplicatedKeyUpdate(v: string[]) {
	return `ON DUPLICATE KEY UPDATE ${v.map(i => `${i}=VALUES(${i})`).join(', ')}`
}