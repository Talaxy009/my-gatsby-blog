import React from 'react';
import {Link, graphql} from 'gatsby';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Valine from 'gatsby-plugin-valine';
import {GatsbyImage} from 'gatsby-plugin-image';
import {formatTime} from '../utils/dataUtils';
import {
	H1,
	P,
	Hr,
	Section,
	Pagination,
	Left,
	Right,
} from '../components/Typography';
import Layout from '../components/Layout';
import Bio from '../components/Bio';
import SEO from '../components/SEO';

export default function BlogTemplate({data, pageContext, location}) {
	const {modifiedTime} = data.file;
	const post = data.markdownRemark;
	const {slug, previous, next} = pageContext;

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

	return (
		<Layout location={location}>
			<SEO
				title={post.frontmatter.title}
				description={post.frontmatter.description || post.excerpt}
				image={
					post.frontmatter.img.childImageSharp.gatsbyImageData.images
						.fallback.src
				}
			/>
			<article>
				<header>
					<GatsbyImage
						image={
							post.frontmatter.img.childImageSharp.gatsbyImageData
						}
						alt={post.frontmatter.title || post.fields.slug}
					/>
					<H1>{post.frontmatter.title}</H1>
					<P>
						{post.frontmatter.date}
						{` • ${formatTime(post.timeToRead)}`}
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
				<Section dangerouslySetInnerHTML={{__html: post.html}} />
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
				{previous && (
					<Left>
						<span>上一篇</span>
						<Link to={previous.fields.slug} rel="prev">
							{previous.frontmatter.title}
						</Link>
					</Left>
				)}
				{next && (
					<Right>
						<span>下一篇</span>
						<Link to={next.fields.slug} rel="next">
							{next.frontmatter.title}
						</Link>
					</Right>
				)}
			</Pagination>
			<Valine path={slug} />
		</Layout>
	);
}

export const pageQuery = graphql`
	query ($slug: String!) {
		file(
			childrenMarkdownRemark: {elemMatch: {fields: {slug: {eq: $slug}}}}
		) {
			modifiedTime(formatString: "YYYY 年 MM 月 DD 日")
		}
		markdownRemark(fields: {slug: {eq: $slug}}) {
			html
			timeToRead
			excerpt(pruneLength: 160)
			frontmatter {
				title
				tags
				date(formatString: "YYYY 年 MM 月 DD 日")
				description
				img {
					childImageSharp {
						gatsbyImageData(width: 1000)
					}
				}
			}
		}
	}
`;
