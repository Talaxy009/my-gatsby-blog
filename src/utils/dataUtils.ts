type PostGroup = {
	tags: TagInfo[];
	postMap: Map<string, Post>;
};

/**
 * 格式化时间
 * @param {number} minutes
 * @returns 包含已取整时间的字符串
 */
export function formatTime(minutes: number): string {
	return `${Math.round(minutes)} 分钟`;
}

/**
 * 计算时间差
 * @param {Date} date
 * @returns 时间差
 */
export function getTimeDiff(date: Date): string {
	const daysAgo = Math.round(
		(Date.now() - date.getTime()) / (1000 * 60 * 60 * 24),
	);
	return daysAgo < 1 ? '今天内' : `${daysAgo}天前`;
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
 * 文章分组
 * @param {array} tagList 标签列表
 * @param {array} postList 文章列表
 */
export function getPostGroup(
	tagList: Queries.PostQuery['allMdx']['tagList'],
	postList: Queries.PostQuery['allMdx']['postList'],
	groupSize: number,
): PostGroup {
	const postMap = new Map<string, Post>();
	const tags = tagList.map(({tagName, totalCount, edges}) => ({
		name: tagName ?? '',
		count: totalCount,
		slugs: splitArray(
			edges.map(({node}) => node.fields.slug),
			groupSize,
		),
	}));
	tags.unshift({
		name: '全部',
		count: postList.length,
		slugs: splitArray(
			postList.map(({node}) => {
				postMap.set(node.fields.slug, node);
				return node.fields.slug;
			}),
			groupSize,
		),
	});
	return {tags, postMap};
}
