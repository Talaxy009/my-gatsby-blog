import GatsbyRecoil from './src/components/GatsbyRecoil';
import PageRoot from './src/components/PageRoot';

import type {GatsbySSR} from 'gatsby';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = GatsbyRecoil;

export const wrapPageElement: GatsbySSR['wrapPageElement'] = PageRoot;

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
	setHtmlAttributes,
}) => {
	setHtmlAttributes({lang: 'zh'});
};
