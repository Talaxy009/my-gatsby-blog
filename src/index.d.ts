type TagInfo = {
	name: string;
	count: number;
	slugs: string[][];
};

type Post = Queries.PostQuery['allMdx']['postList'][0]['node'];
