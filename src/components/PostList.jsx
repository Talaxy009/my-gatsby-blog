import React from 'react';
import {navigate, useStaticQuery, graphql} from 'gatsby';
import Menu from '@mui/material/Menu';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import {GatsbyImage} from 'gatsby-plugin-image';
import styled from 'styled-components';
import {formatTime, splitArray, getTags} from '../utils/dataUtils';

const ListBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 1rem 0;
	padding: 1rem 0;
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
		padding: 1.5rem 0;
	}
`;

const PostContent = styled.div`
	flex: 1;
	padding: 1rem;
	text-align: left;
	@media (max-width: 700px) {
		padding: 0 1.5rem;
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

export default function PostList({posts = [], pageSize = 5}) {
	const allPosts = splitArray(posts, pageSize);
	const allTags = getTags(posts);
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

	const [page, setPage] = React.useState({
		index: 1,
		list: allPosts,
	});
	const [tagMenu, setTagMenu] = React.useState({
		index: 0,
		anchorEl: null,
	});

	const handleChangePage = (_event, value) => {
		setPage({...page, index: value});
		const target = document.getElementById('listBody');
		window.scrollTo({
			top: target.offsetTop,
			left: target.offsetLeft,
			behavior: 'smooth',
		});
	};

	const handleClickMenuButton = (event) => {
		setTagMenu({...tagMenu, anchorEl: event.currentTarget});
	};

	const handleClickTag = (index) => {
		setTagMenu({index: index, anchorEl: null});
		if (index) {
			setPage({
				index: 1,
				list: splitArray(
					posts.filter((v) =>
						v.node.frontmatter.tags.includes(allTags[index]),
					),
					pageSize,
				),
			});
		} else {
			setPage({
				index: 1,
				list: allPosts,
			});
		}
	};

	const handleClose = () => {
		setTagMenu({...tagMenu, anchorEl: null});
	};

	return (
		<ListBody id="listBody">
			<Button
				id="menu-button"
				variant="outlined"
				aria-haspopup="true"
				aria-controls="tag-menu"
				aria-expanded={tagMenu.anchorEl !== null ? 'true' : undefined}
				onClick={handleClickMenuButton}>
				{allTags[tagMenu.index]}
			</Button>
			<Menu
				id="tag-menu"
				anchorEl={tagMenu.anchorEl}
				open={tagMenu.anchorEl !== null}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'menu-button',
				}}>
				{allTags.map((tag, index) => (
					<MenuItem key={index} onClick={() => handleClickTag(index)}>
						{tag}
					</MenuItem>
				))}
			</Menu>
			{page.list[page.index - 1].map(({node}) => (
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
							<Line>
								<span>
									{`${node.frontmatter.date} • ${formatTime(
										node.timeToRead,
									)}`}
								</span>
								<Stack direction="row" spacing={1}>
									{node.frontmatter.tags.map((tag) => (
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
								__html:
									node.frontmatter.description ||
									node.excerpt,
							}}
						/>
					</PostContent>
				</PostItem>
			))}
			<Pagination
				size="large"
				count={page.list.length}
				page={page.index}
				onChange={handleChangePage}
			/>
		</ListBody>
	);
}
