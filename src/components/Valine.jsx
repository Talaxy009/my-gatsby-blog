import React from 'react';
import isSSR from '../utils/isSSR';
import config from '../../valine-config';

const buildValine = async (options) => {
	const RealValine = await (await import('valine')).default;
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
			});
		}
	}, [path, config, ref]);

	return <div ref={ref} {...others} />;
}