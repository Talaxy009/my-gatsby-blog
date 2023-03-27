import React from 'react';
import styled from '@emotion/styled';
import {
	SiPixiv,
	SiGithub,
	SiTwitter,
	SiYoutube,
	SiTelegram,
} from '@icons-pack/react-simple-icons';

const Svg = styled.svg`
	width: 24px;
	height: 24px;
`;

// Twitter icon from: https://simpleicons.org/
export function Twitter({id = ''}) {
	return (
		<a
			rel="nofollow"
			target="_blank"
			title="Twitter"
			href={`https://twitter.com/${id}`}>
			<SiTwitter color="#1DA1F2" size={24} />
		</a>
	);
}

// GitHub icon from: https://simpleicons.org/
export function Github({id = ''}) {
	return (
		<a
			rel="nofollow"
			title="GitHub"
			target="_blank"
			href={`https://github.com/${id}`}>
			<SiGithub id="gh" color="#181717" size={24} />
		</a>
	);
}

// Pixiv icon from: https://simpleicons.org/
export function Pixiv({id = ''}) {
	return (
		<a
			rel="nofollow"
			title="Pixiv"
			target="_blank"
			href={`https://pixiv.me/${id}`}>
			<SiPixiv color="#0096FA" size={24} />
		</a>
	);
}

// YouTube icon from: https://simpleicons.org/
export function YouTube({id = ''}) {
	return (
		<a
			rel="nofollow"
			title="YouTube"
			target="_blank"
			href={`https://www.youtube.com/@${id}`}>
			<SiYoutube color="#FF0000" size={24} />
		</a>
	);
}

// Telegram icon from: https://simpleicons.org/
export function Telegram({id = ''}) {
	return (
		<a
			rel="nofollow"
			target="_blank"
			title="Telegram"
			href={`https://t.me/${id}`}>
			<SiTelegram color="#26A5E4" size={24} />
		</a>
	);
}

// Link icon from: @mui/icons-material
export function Link() {
	return (
		<a href="/friends/" title="友链">
			<Svg id="fl" viewBox="0 0 512 512">
				<path
					fill="none"
					stroke="#A0A0A0"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="48"
					d="M200.66 352H144a96 96 0 010-192h55.41M312.59 160H368a96 96 0 010 192h-56.66M169.07 256h175.86"
				/>
			</Svg>
		</a>
	);
}
