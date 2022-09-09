/**
 * 取反色
 * @param {string} color 16 进制色字符串
 */
export default function colorReverse(color: string | undefined): string {
	if (!color) {
		return '#333';
	}
	const tmp = parseInt(color.slice(1), 16);
	const str = '000000' + (0xffffff - tmp).toString(16);
	return '#' + str.slice(-6);
}
