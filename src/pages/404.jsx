/* eslint-disable no-undef */
import React from 'react';
import {Link} from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';

const Main = styled.main`
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

export default function NotFoundPage() {
	return (
		<Main>
			<SEO title="找不到页面 QAQ" />
			<H1>找不到页面</H1>
			<P>
				抱歉 😭 找不到你要的页面
				<br />
				{process.env.NODE_ENV === 'development' && (
					<>
						试试在这里&nbsp;
						<code className="language-text">src/pages/</code>
						&nbsp;创建页面
					</>
				)}
				<br />
				<Link to="/">返回首页</Link>
			</P>
		</Main>
	);
}
