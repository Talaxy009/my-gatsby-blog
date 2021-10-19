const {createFilePath} = require(`gatsby-source-filesystem`);
const path = require('path');

exports.onCreateWebpackConfig = ({actions}) => {
	actions.setWebpackConfig({
		resolve: {
			alias: {
				'@material-ui/styled-engine': '@material-ui/styled-engine-sc',
			},
		},
	});
};

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

	const result = await graphql(`
		query {
			allMarkdownRemark(
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
	if (result.errors) {
		throw result.errors;
	}
	const posts = result.data.allMarkdownRemark.edges;
	posts.forEach((post, index) => {
		const previous =
			index === posts.length - 1 ? null : posts[index + 1].node;
		const next = index === 0 ? null : posts[index - 1].node;

		createPage({
			path: post.node.fields.slug,
			component: path.resolve('./src/templates/blog-post.jsx'),
			context: {
				slug: post.node.fields.slug,
				previous,
				next,
			},
		});
	});
};
