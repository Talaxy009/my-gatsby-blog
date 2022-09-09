import React from 'react';
import styled from '@emotion/styled';
import {navigate} from 'gatsby';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import colorReverse from '../utils/colorReverse';

type Props = {
	post: Queries.BlogDataQuery['previous'];
};

const NavItem = styled.div`
	width: 46%;
	margin: 8px 0;
	overflow: hidden;
	position: relative;
	border-radius: 12px;
	box-shadow: 0 2px 5px rgba(10, 20, 20, 0.2);
	transition: all 0.6s cubic-bezier(0, 0, 0.4, 1);
	cursor: pointer;
	:hover {
		box-shadow: 0 6px 10px rgba(10, 20, 20, 0.2);
	}
	@media (max-width: 600px) {
		width: 100%;
	}
`;

const NavContent = styled.div<{bgColor: string | undefined}>`
	background: linear-gradient(
		0deg,
		${(props) => props.bgColor + '60' || 'transparent'},
		transparent
	);
	flex-direction: column-reverse;
	box-sizing: border-box;
	position: absolute;
	display: flex;
	height: 100%;
	padding: 6px;
	width: 100%;
	top: 0;
`;

const NavText = styled.span`
	font-size: 22px;
`;

export default function PostNavigation({post}: Props) {
	if (!post) return null;
	const image = getImage(post.frontmatter.img?.childImageSharp || null);
	const txtColor = colorReverse(image?.backgroundColor);

	return (
		<NavItem onClick={() => navigate(post.fields.slug)}>
			{image && (
				<GatsbyImage
					image={image}
					style={{aspectRatio: '16/9'}}
					alt={post.frontmatter.title}
				/>
			)}
			<NavContent bgColor={image?.backgroundColor}>
				<NavText style={{color: txtColor}}>
					{post.frontmatter.title}
				</NavText>
			</NavContent>
		</NavItem>
	);
}
