import React from 'react';
import {graphql} from 'gatsby';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Waline from 'gatsby-plugin-waline';
import {GatsbyImage, getImage, getSrc} from 'gatsby-plugin-image';

import {formatTime} from '../utils/dataUtils';
import {H1, P, Hr, Section, Pagination} from '../components/Typography';
import PostNavigation from '../components/PostNavigation';
import InfoBar from '../components/InfoBar';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

import type {HeadProps, PageProps} from 'gatsby';

export default function BlogTemplate({
	data,
	children,
}: PageProps<Queries.BlogDataQuery>) {
	const modifiedTime = data.file?.modifiedTime;
	const {post, previous, next} = data;

	if (!post) return null;
	const image = getImage(post.frontmatter.img?.childImageSharp || null);

	React.useEffect(() => {
		if (window.location.hash) {
			const targetDomId = window.location.hash.split('#')[1];
			const checkExist = setInterval(() => {
				const target = document.getElementById(targetDomId);
				if (target) {
					target.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
					});
					clearInterval(checkExist);
				}
			}, 800);
			const timeout = setTimeout(() => {
				clearInterval(checkExist);
			}, 2e4); // 20s
			return () => {
				clearInterval(checkExist);
				clearTimeout(timeout);
			};
		}
	}, []);

	return (
		<Layout isArticle>
			<article>
				<header>
					{image && (
						<GatsbyImage
							image={image}
							alt={post.frontmatter.title}
						/>
					)}
					<H1>{post.frontmatter.title}</H1>
					<P>
						{post.frontmatter.date}
						{` • ${formatTime(
							post.fields.timeToRead?.minutes || 1,
						)}`}
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
					<InfoBar>
						本文最后于<strong>{modifiedTime}</strong>
						更新，一些操作可能已经过时
					</InfoBar>
				)}
				<Hr />
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
				description
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
				description
				img {
					childImageSharp {
						gatsbyImageData(width: 400)
					}
				}
			}
		}
	}
`;
