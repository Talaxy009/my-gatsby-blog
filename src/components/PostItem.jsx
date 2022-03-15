import React from 'react';
import {navigate} from 'gatsby';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import styled from '@emotion/styled';
import {formatTime} from '../utils/dataUtils';

const PostItemBody = styled.div`
	width: 100%;
	display: flex;
	margin: 1rem 0;
	border-radius: 12px;
	background-color: rgba(150, 180, 180, 0.05);
	box-shadow: 0 2px 5px rgba(10, 20, 20, 0.2);
	transition: all 0.6s cubic-bezier(0, 0, 0.4, 1);
	cursor: pointer;
	:hover {
		background-color: rgba(150, 180, 180, 0.1);
		box-shadow: 0 6px 10px rgba(10, 20, 20, 0.2);
	}
	@media (max-width: 700px) {
		flex-direction: column;
		padding: 1rem 0;
	}
`;

const PostItemContent = styled.div`
	flex: 1;
	padding: 1rem;
	text-align: left;
	@media (max-width: 700px) {
		padding: 0 1rem;
	}
`;

const Title = styled.p`
	margin: 0.8rem 0;
	font-size: 1.5rem;
	color: #009ba1;
`;

const Line = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	@media (max-width: 890px) {
		flex-direction: column;
		align-items: flex-start;
		line-height: 1.6rem;
	}
`;

const Section = styled.section`
	font-size: 1.05rem;
`;

export default function PostItem({post}) {
	return (
		<PostItemBody onClick={() => navigate(post.fields.slug)}>
			<PostItemContent>
				<GatsbyImage
					image={getImage(post.frontmatter.img)}
					alt={post.frontmatter.title || post.fields.slug}
				/>
			</PostItemContent>
			<PostItemContent>
				<header>
					<Title>{post.frontmatter.title || post.fields.slug}</Title>
					<Line>
						<span>
							{`${post.frontmatter.date} • ${formatTime(
								post.timeToRead,
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
				<Section
					dangerouslySetInnerHTML={{
						__html: post.frontmatter.description || post.excerpt,
					}}
				/>
			</PostItemContent>
		</PostItemBody>
	);
}
