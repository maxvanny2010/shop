export function getFormatDate(rowData) {
	const date = new Date(rowData);
	return date.getUTCFullYear() + '-' +
		String(date.getUTCMonth() + 1).padStart(2, '0') + '-' +
		String(date.getUTCDate()).padStart(2, '0') + ' ' +
		String(date.getUTCHours()).padStart(2, '0') + ':' +
		String(date.getUTCMinutes()).padStart(2, '0') + ':' +
		String(date.getUTCSeconds()).padStart(2, '0');

}
