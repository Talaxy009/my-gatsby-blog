import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import Bio from '../components/Bio';
import SEO from '../components/SEO';

export default function IndexPage({location}) {
	const data = useStaticQuery(graphql`
		{
			site {
				siteMetadata {
					description
				}
			}
			allMarkdownRemark(
				filter: {fileAbsolutePath: {regex: "/blogs/"}}
				sort: {fields: [frontmatter___date], order: DESC}
			) {
				edges {
					node {
						excerpt
						fields {
							slug
						}
						timeToRead
						frontmatter {
							date(formatString: "YYYY-MM-DD")
							title
							tags
							description
							img {
								childImageSharp {
									gatsbyImageData(width: 600)
								}
							}
						}
					}
				}
			}
		}
	`);
	const posts = data.allMarkdownRemark.edges;
	const {description} = data.site.siteMetadata;

	return (
		<Layout location={location}>
			<SEO description={description} />
			<Bio />
			<PostList posts={posts} pageSize={6} />
		</Layout>
	);
}
