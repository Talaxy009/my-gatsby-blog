import React from 'react';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';
import PostItem from './PostItem';
import {splitArray, getTags} from '../utils/dataUtils';

const ListBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 1rem 0;
	padding: 1rem 0;
`;

export default function PostList({posts = [], pageSize = 5}) {
	const allPosts = splitArray(posts, pageSize);
	const allTags = getTags(posts);

	const [mounted, setMounted] = React.useState(false);
	const [page, setPage] = React.useState({
		index: 1,
		list: allPosts,
	});
	const [tagMenu, setTagMenu] = React.useState({
		index: 0,
		anchorEl: null,
	});

	React.useEffect(() => {
		setMounted(true);
	}, []);

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
				<PostItem key={node.fields.slug} post={node} />
			))}
			{mounted && (
				<Pagination
					size="large"
					count={page.list.length}
					page={page.index}
					onChange={handleChangePage}
				/>
			)}
		</ListBody>
	);
}
