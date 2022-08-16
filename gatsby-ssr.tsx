import GatsbyRecoil from './src/components/GatsbyRecoil';

export const wrapRootElement = GatsbyRecoil;

export const onRenderBody = ({setHtmlAttributes}) => {
	setHtmlAttributes({lang: 'zh'});
};
