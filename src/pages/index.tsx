import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import Bio from '../components/Bio';
import SEO from '../components/SEO';
import {splitArray, getTags} from '../utils/dataUtils';

import type {PageProps} from 'gatsby';

export default function IndexPage({data, path}: PageProps<Queries.PostQuery>) {
	const {posts, tagsGroup} = data.allMarkdownRemark;
	const pageSize = 6;

	const allPosts = [
		splitArray(posts, pageSize),
		...tagsGroup.map(({edges}) => splitArray(edges, pageSize)),
	];
	const allTags = getTags(tagsGroup);

	return (
		<Layout path={path}>
			<Bio />
			<PostList allPosts={allPosts} allTags={allTags} />
		</Layout>
	);
}

export function Head() {
	return <SEO />;
}

export const pageQuery = graphql`
	query Post {
		allMarkdownRemark(
			filter: {fileAbsolutePath: {regex: "/blogs/"}}
			sort: {fields: [frontmatter___date], order: DESC}
		) {
			tagsGroup: group(field: frontmatter___tags) {
				tag: fieldValue
				totalCount
				edges {
					node {
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
			posts: edges {
				node {
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
`;
