import {createFilePath} from 'gatsby-source-filesystem';
import readingTime from 'reading-time';
import path from 'path';

import type {GatsbyNode} from 'gatsby';

/* 勿用 @mui/styled-engine-sc
export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
	actions,
}) => {
	actions.setWebpackConfig({
		resolve: {
			alias: {
				'@mui/styled-engine': '@mui/styled-engine-sc',
			},
		},
	});
};
*/

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
	node,
	getNode,
	actions,
}) => {
	const {createNodeField} = actions;
	if (node.internal.type === 'Mdx') {
		const slug = createFilePath({node, getNode});
		createNodeField({
			node,
			name: 'slug',
			value: slug,
		});
		createNodeField({
			node,
			name: 'timeToRead',
			value: readingTime(node.body as string)
		  })
	}
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
	({actions}) => {
		actions.createTypes(`
    		type Site {
      			siteMetadata: SiteMetadata!
    		}
    		type SiteMetadata {
      			title: String!
				siteUrl: String!
				description: String!
				social: Social!
				author: Author!
			}
			type Social {
				telegram: String!
				youtube: String!
				twitter: String!
				github: String!
				pixiv: String!
			}
			type Author {
				name: String!
				summary: String!
			}
			type Mdx implements Node {
				frontmatter: Frontmatter!
				fields: Fields!
			}
			type Frontmatter {
    			title: String!
				tags: [String!]!
    			description: String!
			}
			type Fields {
				slug: String!
			}
  		`);
	};

export const createPages: GatsbyNode['createPages'] = async ({
	graphql,
	actions,
	reporter,
}) => {
	const {createPage, createSlice} = actions;

	const bioSlice = path.resolve('./src/slices/Bio.tsx');
	const blogTemplate = path.resolve('./src/templates/BlogTemplate.tsx');
	const pageTemplate = path.resolve('./src/templates/PageTemplate.tsx');

	// bio slice
	createSlice({
		id: 'bio',
		component: bioSlice,
	});

	const result = await graphql<Queries.PagesDataQuery>(`
		query PagesData {
			blogPosts: allMdx(
				filter: {internal: {contentFilePath: {regex: "/blogs/"}}}
				sort: {frontmatter: {date: ASC}}
				limit: 1000
			) {
				nodes {
					id
					fields {
						slug
					}
					internal {
						contentFilePath
					}
				}
			}
			pages: allMdx(
				filter: {internal: {contentFilePath: {regex: "/pages/"}}}
				limit: 1000
			) {
				nodes {
					id
					fields {
						slug
					}
					internal {
						contentFilePath
					}
				}
			}
		}
	`);
	if (result.errors || !result.data) {
		reporter.panicOnBuild(
			'Error while running GraphQL query.',
			result.errors,
		);
		return;
	}
	const posts = result.data.blogPosts.nodes;
	const pages = result.data.pages.nodes;
	// blog posts
	posts.forEach((post, index) => {
		const previousId = index === 0 ? null : posts[index - 1].id;
		const nextId = index === posts.length - 1 ? null : posts[index + 1].id;
		createPage({
			path: post.fields.slug,
			component: `${blogTemplate}?__contentFilePath=${post.internal.contentFilePath}`,
			context: {
				id: post.id,
				previousId,
				nextId,
			},
		});
	});
	// pages
	pages.forEach((page) => {
		createPage({
			path: page.fields.slug,
			component: `${pageTemplate}?__contentFilePath=${page.internal.contentFilePath}`,
			context: {
				id: page.id,
			},
		});
	});
};
