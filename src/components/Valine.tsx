import React from 'react';
import isSSR from '../utils/isSSR';
import config from '../../valine-config';

export interface ValineOptions {
	el: string | HTMLElement;
	appId: string;
	appKey: string;
	placeholder?: string;
	path?: string;
	avatar?:
		| ''
		| 'mp'
		| 'identicon'
		| 'monsterid'
		| 'wavatar'
		| 'retro'
		| 'robohash'
		| 'hide';
	meta?: ('nick' | 'mail' | 'link')[];
	pageSize?: number;
	lang?: string;
	visitor?: boolean;
	highlight?: boolean;
	avatarForce?: boolean;
	recordIP?: boolean;
	serverURLs?: string;
	emojiCDN?: string;
	emojiMaps?: Record<string, string>;
	enableQQ?: boolean;
	requiredFields?: ['nick'] | ['nick', 'mail'];
}

const buildValine = async (options: ValineOptions) => {
	const RealValine = (await import('valine')).default;
	new RealValine(options);
};

export default function Valine({path = '', ...others}) {
	const ref = React.useRef(null);

	React.useEffect(() => {
		if (!isSSR() && ref.current) {
			buildValine({
				el: ref.current,
				path,
				...config,
				avatar: config.avatar as ValineOptions["avatar"],
			});
		}
	}, [path, config, ref]);

	return <div ref={ref} {...others} />;
}
