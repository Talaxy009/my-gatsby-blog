import React from 'react';
import styled from '@emotion/styled';
import {navigate} from 'gatsby';
import {createTheme, ThemeProvider, Stack} from '@mui/material';
import SyncIcon from '@mui/icons-material/SyncRounded';
import CopyrightIcon from '@mui/icons-material/Copyright';
import RssFeedIcon from '@mui/icons-material/RssFeedRounded';
import FriendsIcon from '@mui/icons-material/Diversity3Rounded';

import {Link} from './Links';
import DarkModeButton from './DarkModeButton';
import { useSiteInfo } from '../utils/hooks';
import {getTimeDiff} from '../utils/dataUtils';
import {useDarkModeValue} from '../utils/darkMode';

type LayoutProps = {
	isArticle?: boolean;
	children: React.ReactNode;
};

const Root = styled.div`
	margin: auto;
	max-width: 50rem;
	padding: 3rem 5rem 0 5rem;
	@media (max-width: 780px) {
		padding: 3rem 2rem 0 2rem;
	}
	@media (max-width: 580px) {
		padding: 3rem 1rem 0 1rem;
	}
`;

const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	h2 {
		font-size: 1.7rem;
		cursor: pointer;
	}
`;

const Footer = styled.footer`
	display: flex;
	background-color: var(--md-sys-color-surface-container);
	color: var(--md-sys-color-on-surface);
	flex-direction: column;
	align-items: center;
	position: relative;
	text-align: center;
	font-size: 0.8rem;
	overflow: hidden;
	padding: 3rem 1rem 1rem;
	:before {
		content: '';
		background-color: var(--md-sys-color-surface);
		border-radius: 24px;
		position: absolute;
		height: 48px;
		width: 100%;
		top: -24px;
	}
`;

export default function Layout({isArticle = false, children}: LayoutProps) {
	const darkMode = useDarkModeValue();
	const {buildTime, siteMetadata} = useSiteInfo();

	const rootPath = '/';
	const {title, author} = siteMetadata;
	const buildTimeDiff = getTimeDiff(new Date(buildTime));

	const theme = React.useMemo(
		() =>
			createTheme({
				components: {
					MuiPaper: {
						styleOverrides: {
							root: {
								backgroundColor: 'var(--md-sys-color-surface)',
								borderRadius: '16px',
							},
						},
					},
					MuiButton: {
						styleOverrides: {
							root: {
								borderRadius: '24px',
							},
						},
					},
					MuiAlert: {
						styleOverrides: {
							root: {
								borderRadius: '24px',
							},
						},
					},
				},
				palette: {
					primary: {
						main: '#009ba1',
					},
					secondary: {
						main: '#cce8e9',
					},
					mode: darkMode ? 'dark' : 'light',
				},
			}),
		[darkMode],
	);

	return (
		<>
			<Root>
				<ThemeProvider theme={theme}>
					{isArticle && (
						<Header>
							<h2 onClick={() => navigate(rootPath)}>{title}</h2>
							<DarkModeButton />
						</Header>
					)}
					<main>{children}</main>
				</ThemeProvider>
			</Root>
			<Footer>
				<Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
					<Link
						icon={<FriendsIcon />}
						url="/friends/"
						text="友情链接"
						inner
					/>
					<Link
						icon={<RssFeedIcon />}
						title="RSS Feed"
						url="/rss/"
						text="RSS 订阅"
					/>
					<Link
						icon={<SyncIcon />}
						title="本站构建时间"
						url="https://github.com/Talaxy009/my-gatsby-blog/actions"
						text={buildTimeDiff}
					/>
					<Link
						icon={<CopyrightIcon />}
						title="CC BY-NC-SA 4.0"
						url="https://creativecommons.org/licenses/by-nc-sa/4.0/"
						text={`${new Date().getFullYear()} ${author.name}`}
					/>
				</Stack>
			</Footer>
		</>
	);
}
