import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import SEO from '../components/SEO';
import Banner from '../components/Banner';
import {splitArray, getTags} from '../utils/dataUtils';

import type {PageProps} from 'gatsby';

export default function IndexPage({data}: PageProps<Queries.PostQuery>) {
	const {posts, tagsGroup} = data.allMdx;
	const pageSize = 6;

	const allPosts = [
		splitArray(posts, pageSize),
		...tagsGroup.map(({edges}) => splitArray(edges, pageSize)),
	];
	const allTags = getTags(tagsGroup);

	return (
		<Layout>
			<Banner />
			<PostList allPosts={allPosts} allTags={allTags} />
		</Layout>
	);
}

export function Head() {
	return <SEO />;
}

export const pageQuery = graphql`
	query Post {
		allMdx(
			filter: {internal: {contentFilePath: {regex: "/blogs/"}}}
			sort: {frontmatter: {date: DESC}}
		) {
			tagsGroup: group(field: {frontmatter: {tags: SELECT}}) {
				tag: fieldValue
				totalCount
				edges {
					node {
						fields {
							slug
							timeToRead {
								minutes
							}
						}
						frontmatter {
							date(formatString: "YYYY.MM.DD")
							title
							tags
							description
							img {
								childImageSharp {
									gatsbyImageData(width: 400)
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
						timeToRead {
							minutes
						}
					}
					frontmatter {
						date(formatString: "YYYY.MM.DD")
						title
						tags
						description
						img {
							childImageSharp {
								gatsbyImageData(width: 400)
							}
						}
					}
				}
			}
		}
	}
`;
