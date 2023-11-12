import React from 'react';
import {navigate} from 'gatsby';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

import {useSiteInfo} from '../utils/hooks';
import DarkModeButton from './DarkModeButton';
import BannerImg from '../assets/images/banner.svg';

const BannerRoot = styled.div`
	border-radius: 24px;
	position: relative;
	aspect-ratio: 1.6;
	overflow: hidden;
	color: #e5ffff;
	.bannerImg {
		width: 100%;
	}
`;

const BannerContainer = styled.div`
	justify-content: center;
	box-sizing: border-box;
	flex-direction: column;
	align-items: center;
	position: absolute;
	display: flex;
	padding: 1rem;
	height: 100%;
	width: 100%;
	top: 0;
	h1 {
		font-size: 2.4em;
		@media (max-width: 450px) {
			margin: 0.4em 0;
		}
	}
`;

const Topbar = styled.div`
	justify-content: space-between;
	flex-direction: row-reverse;
	box-sizing: border-box;
	align-items: center;
	position: absolute;
	padding: 1rem;
	display: flex;
	width: 100%;
	top: 0;
	h2 {
		margin: 8px;
		cursor: pointer;
	}
`;

const Description = styled.span`
	margin-bottom: 0.8em;
	font-size: 1.2em;
`;

interface BannerProps {
	title?: string;
	description?: string;
}

export default function Banner({title, description}: BannerProps) {
	const {siteMetadata} = useSiteInfo();
	const {title: siteTitle, description: siteDescription} = siteMetadata;

	return (
		<BannerRoot>
			<img alt="banner" className="bannerImg" src={BannerImg} />
			<BannerContainer>
				<h1>{title || siteTitle}</h1>
				<Description>{description || siteDescription}</Description>
				{!title && (
					<Button
						color="secondary"
						variant="contained"
						onClick={() => navigate('/about/')}>
						关于我
					</Button>
				)}
			</BannerContainer>
			<Topbar>
				<DarkModeButton />
				{title && <h2 onClick={() => navigate('/')}>{siteTitle}</h2>}
			</Topbar>
		</BannerRoot>
	);
}
