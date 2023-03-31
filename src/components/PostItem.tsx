import React from 'react';
import {Link} from 'gatsby';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import styled from '@emotion/styled';
import {formatTime} from '../utils/dataUtils';

type Post = Queries.PostQuery['allMdx']['posts'][0]['node'];

const PostItemBody = styled(Link)`
	width: 100%;
	display: flex;
	color: inherit;
	margin: 1rem 0;
	overflow: hidden;
	border-radius: 12px;
	text-decoration: none;
	background-color: rgba(150, 180, 180, 0.05);
	box-shadow: 0 2px 5px rgba(10, 20, 20, 0.2);
	transition: all 0.6s cubic-bezier(0, 0, 0.4, 1);
	:hover {
		text-decoration: none;
		background-color: rgba(150, 180, 180, 0.1);
		box-shadow: 0 6px 10px rgba(10, 20, 20, 0.2);
	}
	@media (max-width: 700px) {
		flex-direction: column;
	}
`;

const PostItemContent = styled.div`
	flex: 1;
	padding: 1rem;
	text-align: left;
	@media (max-width: 700px) {
		padding-top: 0;
	}
`;

const Title = styled.p`
	margin: 0.8rem 0;
	font-size: 1.5rem;
	color: #009ba1;
`;

const Line = styled.div`
	display: flex;
	flex-wrap: wrap;
	line-height: 2em;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	@media (max-width: 890px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const Section = styled.section`
	font-size: 1.05rem;
`;

const Skeleton = styled.div`
	flex: 1;
	background-color: rgba(150, 180, 180, 0.05);
`;

export default function PostItem({post}: {post: Post}) {
	if (!post) return null;
	const image = getImage(post.frontmatter.img?.childImageSharp || null);

	return (
		<PostItemBody to={post.fields.slug}>
			{image ? (
				<GatsbyImage
					style={{flex: 1}}
					image={image}
					alt={post.frontmatter.title}
				/>
			) : (
				<Skeleton />
			)}
			<PostItemContent>
				<header>
					<Title>{post.frontmatter.title}</Title>
					<Line>
						<span>
							{`${post.frontmatter.date} • ${formatTime(
								post.fields.timeToRead?.minutes || 1,
							)}`}
						</span>
						<Stack direction="row" spacing={1}>
							{post.frontmatter.tags.map((tag) => (
								<Chip
									key={tag}
									label={tag}
									variant="outlined"
									color="primary"
									size="small"
								/>
							))}
						</Stack>
					</Line>
				</header>
				<hr />
				<Section>{post.frontmatter.description}</Section>
			</PostItemContent>
		</PostItemBody>
	);
}
