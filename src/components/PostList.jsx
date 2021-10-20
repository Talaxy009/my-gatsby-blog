import React from 'react';
import {navigate, useStaticQuery, graphql} from 'gatsby';
import Pagination from '@mui/material/Pagination';
import {GatsbyImage} from 'gatsby-plugin-image';
import styled from 'styled-components';
import {formatTime, splitArray} from '../utils/dataUtils';

const ListBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 1rem 0;
`;

const PostItem = styled.div`
	width: 100%;
	display: flex;
	margin: 1rem 0;
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

export default function PostList({posts = [], pageSize = 5}) {
	const [page, setPage] = React.useState(1);
	const data = useStaticQuery(graphql`
		{
			site {
				siteMetadata {
					author {
						name
					}
				}
			}
		}
	`);
	const {author} = data.site.siteMetadata;
	const pageList = splitArray(posts, pageSize);
	const handleChange = (_event, value) => setPage(value);

	return (
		<ListBody>
			{pageList[page - 1].map(({node}) => (
				<PostItem
					key={node.fields.slug}
					onClick={() => navigate(node.fields.slug)}>
					<PostContent>
						<GatsbyImage
							image={
								node.frontmatter.img.childImageSharp
									.gatsbyImageData
							}
							alt={author.name}
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
			<Pagination
				size="large"
				count={pageList.length}
				page={page}
				onChange={handleChange}
				classes={{}}
			/>
		</ListBody>
	);
}
