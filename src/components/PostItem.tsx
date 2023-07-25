import React from 'react';
import {Link} from 'gatsby';
import styled from '@emotion/styled';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import TimeIcon from '@mui/icons-material/AccessTimeOutlined';
import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined';

import {formatTime} from '../utils/dataUtils';

type Props = {
	post?: Post;
};

const PostItemBody = styled(Link)`
	width: 100%;
	display: flex;
	margin: 1rem 0;
	overflow: hidden;
	border-radius: 24px;
	text-decoration: none;
	background-color: var(--md-sys-color-surface-container);
	/* border: 1px solid var(--md-sys-color-outline-variant); */
	transition: var(--sys-transition);
	.gatsby-image-wrapper {
		flex: 1;
		border-radius: 24px;
		background-color: var(--md-sys-color-surface-container);
	}
	:hover {
		border-radius: 48px;
		text-decoration: none;
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

const Title = styled.h2`
	margin: 0.8rem 0;
`;

const Description = styled.p`
	font-size: 1.05rem;
	color: var(--md-sys-color-on-surface);
`;

export default function PostItem({post}: Props) {
	if (!post) return null;
	const image = getImage(post.frontmatter.img?.childImageSharp || null);

	return (
		<PostItemBody to={post.fields.slug}>
			{image && (
				<GatsbyImage image={image} alt={post.frontmatter.title} />
			)}
			<PostItemContent>
				<Title>{post.frontmatter.title}</Title>
				<Stack direction="row" spacing={1}>
					<Chip
						size="small"
						color="info"
						variant="outlined"
						icon={<CalendarIcon />}
						label={post.frontmatter.date}
					/>
					<Chip
						size="small"
						color="info"
						variant="outlined"
						icon={<TimeIcon />}
						label={formatTime(post.fields.timeToRead?.minutes || 1)}
					/>
				</Stack>
				<Description>{post.frontmatter.description}</Description>
			</PostItemContent>
		</PostItemBody>
	);
}
