import React, {Fragment} from 'react';
import {navigate} from 'gatsby';
import {GatsbyImage} from 'gatsby-plugin-image';
import styled from 'styled-components';
import formatTime from '../utils/formatTime';

const PostItem = styled.div`
	width: 100%;
	display: flex;
	margin: 2rem 0;
	border-radius: 12px;
	background-color: rgba(150, 180, 180, 0.05);
	box-shadow: 0 0 2px #bdbdbd;
	cursor: pointer;
	:hover {
		background-color: rgba(150, 180, 180, 0.1);
	}
	@media (max-width: 700px) {
		flex-direction: column;
	}
`;

const PostContent = styled.div`
	flex: 1;
	padding: 1rem;
	text-align: left;
`;

const Title = styled.p`
	margin: 0.8rem 0;
	font-size: 1.4rem;
	color: #009ba1;
`;

const P = styled.p`
	font-size: 1rem;
`;

export default function PostList({posts = [], authorName = ''}) {
	return (
		<Fragment>
			{posts.map(({node}) => (
				<PostItem
					key={node.fields.slug}
					onClick={() => navigate(node.fields.slug)}>
					<PostContent>
						<GatsbyImage
							image={
								node.frontmatter.img.childImageSharp
									.gatsbyImageData
							}
							alt={authorName}
						/>
					</PostContent>
					<PostContent>
						<header>
							<Title>
								{node.frontmatter.title || node.fields.slug}
							</Title>
							<span>
								{`${node.frontmatter.date} • ${formatTime(
									node.timeToRead,
								)}`}
							</span>
							<hr />
						</header>
						<section>
							<P
								dangerouslySetInnerHTML={{
									__html:
										node.frontmatter.description ||
										node.excerpt,
								}}
							/>
						</section>
					</PostContent>
				</PostItem>
			))}
		</Fragment>
	);
}
