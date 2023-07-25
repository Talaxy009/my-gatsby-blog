import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import SEO from '../components/SEO';
import Banner from '../components/Banner';
import {getPostGroup} from '../utils/dataUtils';

import type {PageProps} from 'gatsby';

const PAGE_SIZE = 6;

export default function IndexPage({data}: PageProps<Queries.PostQuery>) {
	const {postList, tagList} = data.allMdx;

	const {tags, postMap} = getPostGroup(tagList, postList, PAGE_SIZE);

	return (
		<Layout>
			<Banner />
			<PostList postMap={postMap} tags={tags} />
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
			tagList: group(field: {frontmatter: {tags: SELECT}}) {
				tagName: fieldValue
				totalCount
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
			postList: edges {
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
