/**
 * 格式化时间
 * @param {number} minutes
 * @returns 包含 emoji 和文字的字符串
 */
export function formatTime(minutes: number): string {
	const bowls = new Array(Math.floor(minutes / 20)).fill('🍚');
	const cups = new Array(Math.ceil((minutes % 20) / 5)).fill('🍵');
	return `${bowls.concat(cups).join('')} 需要 ${Math.ceil(minutes)} 分钟`;
}

/**
 * 分割数组
 * @param {array} arr 待分割数组
 * @param {number} size 每段数组的大小
 * @returns 已分割的数组
 */
export function splitArray<T>(arr: readonly T[], size: number): T[][] {
	let newArr = [];
	for (let i = 0; i < arr.length; ) {
		newArr.push(arr.slice(i, (i += size)));
	}
	return newArr;
}

/**
 * 提取标签
 * @param {array} tagsGroup 标签列表
 * @returns 包含标签的数组
 */
export function getTags(
	tagsGroup: Queries.PostQuery['allMdx']['tagsGroup'],
): string[] {
	const tags = tagsGroup.map((item) => item.tag || '');
	tags.unshift('全部');
	return tags;
}
