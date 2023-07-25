type TagInfo = {
	name: string;
	count: number;
	slugs: string[][];
};

type Post = Queries.PostQuery['allMdx']['posts'][0]['node'];
