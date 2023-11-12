import React from 'react';
import {Link} from 'gatsby';
import styled from '@emotion/styled';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';

type Props = {
	post: Queries.BlogDataQuery['previous'];
};

const NavItem = styled(Link)`
	width: 46%;
	margin: 8px 0;
	overflow: hidden;
	border-radius: 24px;
	text-decoration: none;
	flex-direction: column;
	transition: var(--sys-transition);
	-webkit-tap-highlight-color: transparent;
	background-color: var(--md-sys-color-surface-container);
	.gatsby-image-wrapper {
		width: 100%;
		border-radius: 24px;
		background-color: var(--md-sys-color-surface-container);
	}
	:hover,
	:focus,
	:active {
		border-radius: 48px;
		text-decoration: none;
	}
	@media (max-width: 600px) {
		width: 100%;
	}
`;

const NavTitle = styled.h3`
	margin: 0.5em 0;
	color: var(--md-sys-color-primary);
`;

const NavContent = styled.div`
	width: 100%;
	padding: 18px;
	box-sizing: border-box;
	color: var(--md-sys-color-on-surface-variant);
`;

export default function PostNavigation({post}: Props) {
	if (!post) return null;
	const image = getImage(post.frontmatter.img?.childImageSharp || null);

	return (
		<NavItem to={post.fields.slug}>
			{image && (
				<GatsbyImage
					image={image}
					style={{aspectRatio: '16/9'}}
					alt={post.frontmatter.title}
				/>
			)}
			<NavContent>
				<NavTitle>{post.frontmatter.title}</NavTitle>
				{post.frontmatter.description}
			</NavContent>
		</NavItem>
	);
}
