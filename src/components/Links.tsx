import React from 'react';
import {Link as GatsbyLink} from 'gatsby';
import styled from '@emotion/styled';
import {
	SiPixiv,
	SiGithub,
	SiYoutube,
	SiTelegram,
	SiX,
} from '@icons-pack/react-simple-icons';

const LinkRoot = styled.a`
	display: flex;
	padding: 0.8rem 1rem;
	overflow: hidden;
	align-items: center;
	border-radius: 16px;
	text-decoration: none;
	transition: var(--sys-transition);
	color: var(--md-sys-color-on-surface);
	-webkit-tap-highlight-color: transparent;
	background-color: var(--md-sys-color-surface-container);
	:hover,
	:focus,
	:active {
		border-radius: 24px;
		text-decoration: none;
	}
`;

const InnerLinkRoot = styled(GatsbyLink)`
	display: flex;
	padding: 0.8rem 1rem;
	overflow: hidden;
	align-items: center;
	border-radius: 16px;
	text-decoration: none;
	transition: var(--sys-transition);
	color: var(--md-sys-color-on-surface);
	-webkit-tap-highlight-color: transparent;
	background-color: var(--md-sys-color-surface-container);
	:hover,
	:focus,
	:active {
		border-radius: 24px;
		text-decoration: none;
	}
`;

const LinkContent = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 0.6rem;
	.link-site {
		font-weight: bold;
		color: var(--md-sys-color-primary);
	}
	.link-user {
		font-size: 0.8em;
	}
`;

const links = {
	x: {
		name: 'X / Twitter',
		url: 'https://twitter.com/',
		icon: <SiX id="ic-x" color="#000" size={28} />,
	},
	github: {
		name: 'GitHub',
		url: 'https://github.com/',
		icon: <SiGithub id="ic-gh" color="#181717" size={28} />,
	},
	pixiv: {
		name: 'Pixiv',
		url: 'https://pixiv.me/',
		icon: <SiPixiv color="#0096FA" size={28} />,
	},
	youtube: {
		name: 'YouTube',
		url: 'https://www.youtube.com/@',
		icon: <SiYoutube color="#FF0000" size={28} />,
	},
	telegram: {
		name: 'Telegram',
		url: 'https://t.me/',
		icon: <SiTelegram color="#26A5E4" size={28} />,
	},
};

type Site = 'x' | 'github' | 'pixiv' | 'youtube' | 'telegram';

interface SiteLinkProps {
	id: string;
	site: Site;
	name: string;
}

interface LinkProps {
	icon: React.ReactNode;
	title?: string;
	inner?: boolean;
	text: string;
	url: string;
}

export function SiteLink({id, site, name}: SiteLinkProps) {
	return (
		<LinkRoot
			rel="nofollow"
			target="_blank"
			title={links[site].name}
			href={links[site].url + id}>
			{links[site].icon}
			<LinkContent>
				<span className="link-site">{links[site].name}</span>
				<span className="link-user">{name}</span>
			</LinkContent>
		</LinkRoot>
	);
}

export function Link({icon, title, text, url, inner = false}: LinkProps) {
	if (inner) {
		return (
			<InnerLinkRoot title={title || text} to={url}>
				{icon}
				<LinkContent>{text}</LinkContent>
			</InnerLinkRoot>
		);
	}
	return (
		<LinkRoot
			rel="nofollow"
			target="_blank"
			title={title || text}
			href={url}>
			{icon}
			<LinkContent>{text}</LinkContent>
		</LinkRoot>
	);
}
