import {createFilePath} from 'gatsby-source-filesystem';
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
	if (node.internal.type === 'MarkdownRemark') {
		const slug = createFilePath({node, getNode});
		createNodeField({
			node,
			name: 'slug',
			value: slug,
		});
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
				twitter: String!
				github: String!
				pixiv: String!
			}
			type Author {
				name: String!
				summary: String!
			}

			type MarkdownRemark implements Node {
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
	const {createPage} = actions;
	const blogTemplate = path.resolve('./src/templates/BlogTemplate.tsx');
	const pageTemplate = path.resolve('./src/templates/PageTemplate.tsx');

	const result = await graphql<Queries.PagesDataQuery>(`
		query PagesData {
			blogPosts: allMarkdownRemark(
				filter: {fileAbsolutePath: {regex: "/blogs/"}}
				sort: {frontmatter: {date: ASC}}
				limit: 1000
			) {
				nodes {
					id
					fields {
						slug
					}
				}
			}
			pages: allMarkdownRemark(
				filter: {fileAbsolutePath: {regex: "/pages/"}}
				limit: 1000
			) {
				nodes {
					id
					fields {
						slug
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
			component: blogTemplate,
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
			component: pageTemplate,
			context: {
				id: page.id,
			},
		});
	});
};
