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

exports.createPages = async ({graphql, actions, reporter}) => {
	const {createPage} = actions;
	const blogTemplate = path.resolve('./src/templates/BlogTemplate.jsx');
	const pageTemplate = path.resolve('./src/templates/PageTemplate.jsx');

	const result = await graphql(`
		query {
			blogPosts: allMarkdownRemark(
				filter: {fileAbsolutePath: {regex: "/blogs/"}}
				sort: {fields: [frontmatter___date], order: ASC}
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
	if (result.errors) {
		reporter.panicOnBuild(
			'Error while running GraphQL query.',
			result.errors,
		);
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
