import GatsbyRecoil from './src/components/GatsbyRecoil';

import type {GatsbySSR} from 'gatsby';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = GatsbyRecoil;

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
	setHtmlAttributes,
}) => {
	setHtmlAttributes({lang: 'zh'});
};
