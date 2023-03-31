import React from 'react';
import {Slice, graphql} from 'gatsby';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Waline from 'gatsby-plugin-waline';
import {GatsbyImage, getImage, getSrc} from 'gatsby-plugin-image';
import {formatTime} from '../utils/dataUtils';
import {H1, P, Hr, Section, Pagination} from '../components/Typography';
import PostNavigation from '../components/PostNavigation';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

import type {HeadProps, PageProps} from 'gatsby';

export default function BlogTemplate({data, children}: PageProps<Queries.BlogDataQuery>) {
	const modifiedTime = data.file?.modifiedTime;
	const {post, previous, next} = data;

	if (!post) return null;
	const image = getImage(post.frontmatter.img?.childImageSharp || null);

	return (
		<Layout>
			<article>
				<header>
					{image && (
						<GatsbyImage
							image={image}
							alt={post.frontmatter.title || post.fields.slug}
						/>
					)}
					<H1>{post.frontmatter.title}</H1>
					<P>
						{post.frontmatter.date}
						{` • ${formatTime(post.fields.timeToRead?.minutes || 1)}`}
					</P>
					<Stack direction="row" spacing={1}>
						{post.frontmatter.tags.map((tag) => (
							<Chip
								key={tag}
								label={tag}
								variant="outlined"
								color="primary"
							/>
						))}
					</Stack>
				</header>
				<Section>{children}</Section>
				{post.frontmatter.tags.includes('技术') && (
					<Alert severity="info">
						本文最后于<strong>{modifiedTime}</strong>
						更新，一些操作可能已经过时
					</Alert>
				)}
				<Hr />
				<footer>
					<Slice alias="bio" />
				</footer>
			</article>
			<Pagination>
				<PostNavigation post={previous} />
				<PostNavigation post={next} />
			</Pagination>
			<Waline path={post.fields.slug} />
		</Layout>
	);
}

export function Head({data}: HeadProps<Queries.BlogDataQuery>) {
	if (!data.post) return null;
	const frontmatter = data.post.frontmatter;

	return (
		<SEO
			title={frontmatter.title}
			description={frontmatter.description}
			{...(frontmatter.img?.childImageSharp && {
				image: getSrc(frontmatter.img.childImageSharp),
			})}
		/>
	);
}

export const pageQuery = graphql`
	query BlogData($id: String!, $previousId: String, $nextId: String) {
		file(childrenMdx: {elemMatch: {id: {eq: $id}}}) {
			modifiedTime(formatString: "YYYY 年 MM 月 DD 日")
		}
		post: mdx(id: {eq: $id}) {
			fields {
				slug
				timeToRead {
					minutes
				}
			}
			frontmatter {
				title
				tags
				date(formatString: "YYYY 年 MM 月 DD 日")
				description
				img {
					childImageSharp {
						gatsbyImageData(width: 800)
					}
				}
			}
		}
		previous: mdx(id: {eq: $previousId}) {
			fields {
				slug
			}
			frontmatter {
				title
				img {
					childImageSharp {
						gatsbyImageData(width: 400)
					}
				}
			}
		}
		next: mdx(id: {eq: $nextId}) {
			fields {
				slug
			}
			frontmatter {
				title
				img {
					childImageSharp {
						gatsbyImageData(width: 400)
					}
				}
			}
		}
	}
`;
