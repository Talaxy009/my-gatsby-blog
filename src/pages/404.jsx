/* eslint-disable no-undef */
import React from 'react';
import {Link} from 'gatsby';
import styled from '@emotion/styled';
import SEO from '../components/SEO';
import NoFoundImg from '../assets/images/404.svg';

const Main = styled.main`
	padding: 10vh 0 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Img = styled.img`
	width: 100%;
	max-width: 450px;
	height: auto;
`;

const P = styled.p`
	text-align: center;
`;

export default function NotFoundPage() {
	return (
		<Main>
			<SEO title="找不到页面 QAQ" />
			<Img src={NoFoundImg} alt="404 image from Storyset" />
			<P>
				抱歉 😭 找不到你要的页面
				<br />
				<Link to="/">返回首页</Link>
			</P>
		</Main>
	);
}
