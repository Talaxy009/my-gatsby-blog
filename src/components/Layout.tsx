import React from 'react';
import {navigate} from 'gatsby';
import {createTheme, ThemeProvider} from '@mui/material';
import useDarkMode from 'use-dark-mode';
import styled from '@emotion/styled';
import DarkModeButton from './DarkModeButton';
import {useSiteMetadata} from '../utils/hooks';

type LayoutProps = {
	isIndex?: boolean;
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
	h1 {
		font-size: 2.5rem;
	}
	h2 {
		font-size: 1.7rem;
		cursor: pointer;
	}
`;

const Footer = styled.footer`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	font-size: 0.8rem;
	margin: 1rem;
`;

export default function Layout({isIndex = false, children}: LayoutProps) {
	const darkMode = useDarkMode(false);
	const siteMetadata = useSiteMetadata();

	const rootPath = '/';
	const {title, author} = siteMetadata;

	const theme = React.useMemo(
		() =>
			createTheme({
				components: {
					MuiAlert: {
						styleOverrides: {
							root: {
								borderRadius: '12px',
							},
						},
					},
				},
				palette: {
					primary: {
						main: '#009ba1',
					},
					mode: darkMode.value ? 'dark' : 'light',
				},
			}),
		[darkMode.value],
	);

	return (
		<Root>
			<ThemeProvider theme={theme}>
				<Header>
					{isIndex ? (
						<h1>{title}</h1>
					) : (
						<h2 onClick={() => navigate(rootPath)}>{title}</h2>
					)}
					<DarkModeButton mode={darkMode} />
				</Header>
				<main>{children}</main>
				<Footer>
					<span>
						© {new Date().getFullYear()} {author.name}
					</span>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
						CC BY-NC-SA 4.0
					</a>
					<span>
						由&nbsp;
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.gatsbyjs.org">
							Gatsby
						</a>
						&nbsp;强力驱动
					</span>
					<span>
						<a target="_blank" href="/rss/">
							RSS 订阅
						</a>
						<svg
							style={{height: '0.8rem', fill: '#009ba1'}}
							viewBox="0 0 512 512">
							<path d="M108.56 342.78a60.34 60.34 0 1060.56 60.44 60.63 60.63 0 00-60.56-60.44z" />
							<path d="M48 186.67v86.55c52 0 101.94 15.39 138.67 52.11s52 86.56 52 138.67h86.66c0-151.56-125.66-277.33-277.33-277.33z" />
							<path d="M48 48v86.56c185.25 0 329.22 144.08 329.22 329.44H464C464 234.66 277.67 48 48 48z" />
						</svg>
					</span>
				</Footer>
			</ThemeProvider>
		</Root>
	);
}
