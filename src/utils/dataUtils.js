/**
 * 格式化时间
 * @param {number} minutes
 * @returns 包含 emoji 和文字的字符串
 */
export function formatTime(minutes) {
	let cups = Math.round(minutes / 5);
	if (cups > 4) {
		return `${new Array(Math.round(cups / 4))
			.fill('🍚')
			.join('')} 阅读需要 ${minutes} 分钟`;
	} else {
		return `${new Array(cups || 1)
			.fill('🍵')
			.join('')} 阅读需要 ${minutes} 分钟`;
	}
}

/**
 * 分割数组
 * @param {array} arr 待分割数组
 * @param {number} size 每段数组的大小
 * @returns 已分割的数组
 */
export function splitArray(arr, size) {
	let newArr = [];
	for (let i = 0; i < arr.length; ) {
		newArr.push(arr.slice(i, (i += size)));
	}
	return newArr;
}
