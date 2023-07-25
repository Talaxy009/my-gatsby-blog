import React from 'react';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import styled from '@emotion/styled';
import {atom, useRecoilState} from 'recoil';
import PostItem from './PostItem';
import {useHasMounted} from '../utils/hooks';

type Props = {
	postMap: Map<string, Post>;
	tags: TagInfo[];
};

interface tagMenu {
	index: number;
	anchorEl:
		| null
		| React.BaseSyntheticEvent<
				MouseEvent,
				EventTarget & Element,
				EventTarget
		  >['currentTarget'];
}

const ListBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 1rem 0;
	padding: 1rem 0;
`;

const SkeletonList = styled.div`
	display: flex;
	align-items: center;
	.MuiSkeleton-root {
		margin: 0 3px;
	}
`;

const pageState = atom({
	key: 'pageState',
	default: 1,
});

const tagMenuState = atom({
	key: 'tagMenuState',
	default: {index: 0, anchorEl: null} as tagMenu,
});

export default function PostList({postMap, tags}: Props) {
	const hasMounted = useHasMounted();
	const [page, setPage] = useRecoilState(pageState);
	const [tagMenu, setTagMenu] = useRecoilState(tagMenuState);

	const handleChangePage = (
		_event: React.ChangeEvent<unknown>,
		value: number,
	) => {
		setPage(value);
		const target = document.getElementById('listBody');
		if (target) {
			setTimeout(() => target.scrollIntoView({behavior: 'smooth'}), 150);
		}
	};

	const handleClickMenuButton: React.MouseEventHandler = (event) => {
		setTagMenu({...tagMenu, anchorEl: event.currentTarget});
	};

	const handleClickTag = (index: number) => {
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
				aria-expanded={tagMenu.anchorEl !== null ? 'true' : 'false'}
				onClick={handleClickMenuButton}>
				{tags[tagMenu.index].name}
			</Button>
			<Menu
				keepMounted
				id="tag-menu"
				onClose={handleClose}
				anchorEl={tagMenu.anchorEl}
				open={tagMenu.anchorEl !== null}
				MenuListProps={{
					'aria-labelledby': 'menu-button',
				}}>
				{tags.map((tag, index) => (
					<MenuItem key={index} onClick={() => handleClickTag(index)}>
						{tag.name}
					</MenuItem>
				))}
			</Menu>
			{tags[tagMenu.index].slugs[page - 1].map((slug) => (
				<PostItem key={slug} post={postMap.get(slug)} />
			))}
			{hasMounted ? (
				<Pagination
					size="large"
					page={page}
					onChange={handleChangePage}
					count={tags[tagMenu.index].slugs.length}
				/>
			) : (
				// 根据当前页数生成对应骨架数
				<SkeletonList>
					<Skeleton variant="circular" width={40} height={40} />
					{tags[0].slugs.map((_v, i) => (
						<Skeleton
							key={i}
							width={40}
							height={40}
							variant="circular"
						/>
					))}
					<Skeleton variant="circular" width={40} height={40} />
				</SkeletonList>
			)}
		</ListBody>
	);
}
