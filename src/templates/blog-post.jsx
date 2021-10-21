import React from 'react';
import {Link, graphql} from 'gatsby';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Valine from 'gatsby-plugin-valine';
import {GatsbyImage} from 'gatsby-plugin-image';
import styled from 'styled-components';
import {formatTime} from '../utils/dataUtils';
import Layout from '../components/Layout';
import Bio from '../components/Bio';
import SEO from '../components/SEO';

const H1 = styled.h1`
	margin-bottom: 0;
	margin-top: 1em;
	font-size: 2.5em;
`;

const P = styled.p`
	margin-bottom: 0.8rem;
	display: block;
`;

const Hr = styled.hr`
	margin-bottom: 0.8rem;
`;

const Pagination = styled.div`
	margin-top: 2rem;
	margin-bottom: 1rem;
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const Left = styled.div`
	display: flex;
	max-width: 40%;
	flex-direction: column;
`;

const Right = styled.div`
	display: flex;
	max-width: 40%;
	flex-direction: column;
	text-align: right;
`;

const Section = styled.section`
	font-size: 1.1em;
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin-top: 2.5rem;
		margin-bottom: 1.5rem;
	}
	p {
		line-height: 2rem;
	}
`;

export default function BlogPostTemplate({data, pageContext, location}) {
	const post = data.markdownRemark;
	const {author, title} = data.site.siteMetadata;
	const {previous, next} = pageContext;

	return (
		<Layout location={location}>
			<SEO
				title={`${post.frontmatter.title} | ${title}`}
				description={post.frontmatter.description || post.excerpt}
			/>
			<article>
				<header>
					<GatsbyImage
						image={
							post.frontmatter.img.childImageSharp.gatsbyImageData
						}
						alt={author.name}
					/>
					<H1>{post.frontmatter.title}</H1>
					<P>
						{post.frontmatter.date}
						{` • ${formatTime(post.timeToRead)}`}
					</P>
					<Stack direction="row" spacing={1}>
						{post.frontmatter.tags.map((tag) => (
							<Chip key={tag} label={tag} variant="outlined" color="primary" />
						))}
					</Stack>
				</header>
				<Section dangerouslySetInnerHTML={{__html: post.html}} />
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
			<Valine path={post.frontmatter.title} />
		</Layout>
	);
}

export const pageQuery = graphql`
	query ($slug: String!) {
		site {
			siteMetadata {
				title
				author {
					name
				}
			}
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
