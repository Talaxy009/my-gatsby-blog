import React from 'react';
import {useStaticQuery, graphql, Link} from 'gatsby';
import styled from 'styled-components';
import DarkMode from './DarkMode';

const H1 = styled.h1`
	font-size: 2.5rem;
`;

const H2 = styled.h2`
	font-size: 1.7rem;
`;

const Root = styled.div`
	margin: auto;
	max-width: 50rem;
	padding: 3rem 5rem 0 5rem;
	@media (max-width: 580px) {
		padding: 3rem 1rem 0 1rem;
	}
`;

const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Footer = styled.footer`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	font-size: 0.8rem;
	margin: 1rem;
`;

const Layout = ({location, children}) => {
	const data = useStaticQuery(graphql`
		{
			site {
				siteMetadata {
					title
				}
			}
		}
	`);
	const rootPath = '/';
	const title = data.site.siteMetadata.title;
	let header;

	if (location.pathname === rootPath) {
		header = (
			<H1>
				<Link
					style={{
						boxShadow: 'none',
						textDecoration: 'none',
						color: 'inherit',
					}}
					to={'/'}>
					{title}
				</Link>
			</H1>
		);
	} else {
		header = (
			<H2>
				<Link
					style={{
						boxShadow: 'none',
						textDecoration: 'none',
						color: 'inherit',
					}}
					to={'/'}>
					{title}
				</Link>
			</H2>
		);
	}
	return (
		<Root>
			<Header>
				{header}
				<DarkMode />
			</Header>
			<main>{children}</main>
			<Footer>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="http://beian.miit.gov.cn/">
					粤 ICP 备 20015580 号-1
				</a>
				<span>©{new Date().getFullYear()}</span>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
					CC BY-NC-SA 4.0
				</a>
				<span>
					由
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.gatsbyjs.org">
						Gatsby
					</a>
					强力驱动
				</span>
				<span>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.snow-mountain.life/rss.xml">
						RSS 订阅
					</a>
					<svg
						style={{width: '12px', height: '12px'}}
						viewBox="0 0 448 512">
						<path
							fill="#009ba1"
							d="M25.57 176.1C12.41 175.4 .9117 185.2 .0523 198.4s9.173 24.65 22.39 25.5c120.1 7.875 225.7 112.7 233.6 233.6C256.9 470.3 267.4 480 279.1 480c.5313 0 1.062-.0313 1.594-.0625c13.22-.8438 23.25-12.28 22.39-25.5C294.6 310.3 169.7 185.4 25.57 176.1zM32 32C14.33 32 0 46.31 0 64s14.33 32 32 32c194.1 0 352 157.9 352 352c0 17.69 14.33 32 32 32s32-14.31 32-32C448 218.6 261.4 32 32 32zM63.1 351.9C28.63 351.9 0 380.6 0 416s28.63 64 63.1 64s64.08-28.62 64.08-64S99.37 351.9 63.1 351.9z"></path>
					</svg>
				</span>
			</Footer>
		</Root>
	);
};

export default Layout;
