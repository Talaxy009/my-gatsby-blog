const {createFilePath} = require(`gatsby-source-filesystem`);
const path = require('path');

/* 勿用 @mui/styled-engine-sc
exports.onCreateWebpackConfig = ({actions}) => {
	actions.setWebpackConfig({
		resolve: {
			alias: {
				'@mui/styled-engine': '@mui/styled-engine-sc',
			},
		},
	});
};
*/
exports.onCreateNode = ({node, getNode, actions}) => {
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

exports.createPages = async ({graphql, actions}) => {
	const {createPage} = actions;
	// blogs
	const blogsResult = await graphql(`
		query {
			allMarkdownRemark(
				filter: {fileAbsolutePath: {regex: "/blogs/"}}
				sort: {fields: [frontmatter___date], order: DESC}
				limit: 1000
			) {
				edges {
					node {
						fields {
							slug
						}
						frontmatter {
							title
						}
					}
				}
			}
		}
	`);
	if (blogsResult.errors) {
		throw blogsResult.errors;
	}
	const posts = blogsResult.data.allMarkdownRemark.edges;
	posts.forEach((post, index) => {
		const previous =
			index === posts.length - 1 ? null : posts[index + 1].node;
		const next = index === 0 ? null : posts[index - 1].node;

		createPage({
			path: post.node.fields.slug,
			component: path.resolve('./src/templates/BlogTemplate.jsx'),
			context: {
				slug: post.node.fields.slug,
				previous,
				next,
			},
		});
	});
	// pages
	const pagesResult = await graphql(`
		query {
			allMarkdownRemark(
				filter: {fileAbsolutePath: {regex: "/pages/"}}
				limit: 1000
			) {
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
		}
	`);
	if (pagesResult.errors) {
		throw pagesResult.errors;
	}
	const pages = pagesResult.data.allMarkdownRemark.edges;
	pages.forEach((page) => {
		createPage({
			path: page.node.fields.slug,
			component: path.resolve('./src/templates/PageTemplate.jsx'),
			context: {
				slug: page.node.fields.slug,
			},
		});
	});
};
