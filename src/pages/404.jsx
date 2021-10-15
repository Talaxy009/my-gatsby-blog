/* eslint-disable no-undef */
import React from 'react';
import {Link} from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';

// styles
const Main = styled.main`
	color: #232129;
	padding: 96px;
`;
const P = styled.p`
	margin-bottom: 48px;
`;
const H1 = styled.h1`
	margin-top: 0;
	margin-bottom: 64;
	max-width: 320px;
`;

// markup
const NotFoundPage = () => {
	return (
		<Main>
			<SEO title="找不到页面了QAQ"/>
			<H1>找不到页面了</H1>
			<P>
				抱歉{' '}
				<span role="img" aria-label="Pensive emoji">
					😭
				</span>{' '}
				找不到你要的页面
				<br />
				{process.env.NODE_ENV === 'development' ? (
					<>
						<br />
						试试在这里{' '}
						<code className="language-text">src/pages/</code>
						{' '}创建页面
						<br />
					</>
				) : null}
				<br />
				<Link to="/">返回首页</Link>。
			</P>
		</Main>
	);
};

export default NotFoundPage;
