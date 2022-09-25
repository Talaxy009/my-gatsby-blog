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
	color: inherit;
	overflow: hidden;
	border-radius: 12px;
	text-decoration: none;
	flex-direction: column;
	background-color: rgba(150, 180, 180, 0.05);
	box-shadow: 0 2px 5px rgba(10, 20, 20, 0.2);
	transition: all 0.6s cubic-bezier(0, 0, 0.4, 1);
	:hover {
		text-decoration: none;
		background-color: rgba(150, 180, 180, 0.1);
		box-shadow: 0 6px 10px rgba(10, 20, 20, 0.2);
	}
	@media (max-width: 600px) {
		width: 100%;
	}
`;

const NavContent = styled.div`
	width: 100%;
	padding: 6px;
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
			<NavContent>{post.frontmatter.title}</NavContent>
		</NavItem>
	);
}
