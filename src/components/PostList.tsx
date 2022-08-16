import React from 'react';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import styled from '@emotion/styled';
import {atom, useRecoilState} from 'recoil';
import PostItem from './PostItem';
import {useHasMounted} from '../utils/hooks';

const ListBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 1rem 0;
	padding: 1rem 0;
`;

const pageState = atom({
	key: 'pageState',
	default: 1,
});

const tagMenuState = atom({
	key: 'tagMenuState',
	default: {
		index: 0,
		anchorEl: null,
	},
});

export default function PostList({allPosts = [], allTags = []}) {
	const hasMounted = useHasMounted();
	const [page, setPage] = useRecoilState(pageState);
	const [tagMenu, setTagMenu] = useRecoilState(tagMenuState);

	const handleChangePage = (_event, value) => {
		setPage(value);
		const target = document.getElementById('listBody');
		setTimeout(() => target.scrollIntoView({behavior: 'smooth'}), 150);
	};

	const handleClickMenuButton = (event) => {
		setTagMenu({...tagMenu, anchorEl: event.currentTarget});
	};

	const handleClickTag = (index) => {
		setTagMenu({index: index, anchorEl: null});
		setPage(1);
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
			{allPosts[tagMenu.index][page - 1].map(({node}) => (
				<PostItem key={node.fields.slug} post={node} />
			))}
			{hasMounted && (
				<Pagination
					size="large"
					count={allPosts[tagMenu.index].length}
					page={page}
					onChange={handleChangePage}
				/>
			)}
		</ListBody>
	);
}
