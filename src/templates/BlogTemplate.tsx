import React from 'react';
import {graphql} from 'gatsby';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import {GatsbyImage, getImage, getSrc} from 'gatsby-plugin-image';
import {formatTime} from '../utils/dataUtils';
import {H1, P, Hr, Section, Pagination} from '../components/Typography';
import PostNavigation from '../components/PostNavigation';
import Layout from '../components/Layout';
import Valine from '../components/Valine';
import Bio from '../components/Bio';
import SEO from '../components/SEO';

import type {HeadProps, PageProps} from 'gatsby';

export default function BlogTemplate({data}: PageProps<Queries.BlogDataQuery>) {
	const modifiedTime = data.file?.modifiedTime;
	const {post, previous, next} = data;

	React.useEffect(() => {
		if (window.location.hash) {
			const checkExist = setInterval(() => {
				const target = document.getElementById(
					window.location.hash.split('#')[1],
				);
				if (target) {
					target.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
					});
					clearInterval(checkExist);
				}
			}, 500);
		}
	}, []);

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
						{` • ${formatTime(post.timeToRead || 1)}`}
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
				<Section dangerouslySetInnerHTML={{__html: post.html || ''}} />
				{post.frontmatter.tags.includes('技术') && (
					<Alert severity="info">
						本文最后于<strong>{modifiedTime}</strong>
						更新，一些操作可能已经过时
					</Alert>
				)}
				<Hr />
				<footer>
					<Bio />
				</footer>
			</article>
			<Pagination>
				<PostNavigation post={previous} />
				<PostNavigation post={next} />
			</Pagination>
			<Valine path={post.fields.slug} />
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
		file(childrenMarkdownRemark: {elemMatch: {id: {eq: $id}}}) {
			modifiedTime(formatString: "YYYY 年 MM 月 DD 日")
		}
		post: markdownRemark(id: {eq: $id}) {
			html
			timeToRead
			fields {
				slug
			}
			frontmatter {
				title
				tags
				date(formatString: "YYYY 年 MM 月 DD 日")
				description
				img {
					childImageSharp {
						gatsbyImageData(width: 1200)
					}
				}
			}
		}
		previous: markdownRemark(id: {eq: $previousId}) {
			fields {
				slug
			}
			frontmatter {
				title
				img {
					childImageSharp {
						gatsbyImageData(width: 600)
					}
				}
			}
		}
		next: markdownRemark(id: {eq: $nextId}) {
			fields {
				slug
			}
			frontmatter {
				title
				img {
					childImageSharp {
						gatsbyImageData(width: 600)
					}
				}
			}
		}
	}
`;
