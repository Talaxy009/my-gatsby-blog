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
			value: readingTime(node.body as string),
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
				author: Author!
			}
			type Author {
				name: String!
				summary: String!
				twitter: String!
			}
			type Mdx implements Node {
				frontmatter: Frontmatter!
				fields: Fields!
			}
			type Frontmatter {
    			title: String!
				tags: [String!]!
    			description: String!
				date: Date! @dateformat
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
	const {createPage, createRedirect} = actions;

	createRedirect({fromPath: '/rss', toPath: '/rss.xml', statusCode: 200});
	createRedirect({
		fromPath: '/api/*',
		toPath: '/.netlify/functions/*',
		statusCode: 200,
	});

	const blogTemplate = path.resolve('./src/templates/BlogTemplate.tsx');
	const pageTemplate = path.resolve('./src/templates/PageTemplate.tsx');

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

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
	actions,
	getConfig,
}) => {
	const config = getConfig();

	config.module.rules.forEach((rule: any) => {
		rule.oneOf?.forEach((rule: any) => {
			rule.use?.forEach((plugin: any) => {
				if (
					plugin.loader.includes('css-loader') ||
					plugin.loader.includes('mini-css-extract-plugin')
				) {
					if (plugin.options.modules?.namedExport) {
						plugin.options.modules.namedExport = false;
					}
				}
			});
		});
	});
	actions.replaceWebpackConfig(config);
};
