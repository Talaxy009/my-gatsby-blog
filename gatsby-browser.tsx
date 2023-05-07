import NProgress from 'nprogress';
import GatsbyRecoil from './src/components/GatsbyRecoil';
import PageRoot from './src/components/PageRoot';

import './src/styles/waline.css';
import './src/styles/style.css';
import './src/styles/tweet.css';
import './src/styles/code.css';
import './src/styles/link.css';

import type {GatsbyBrowser} from 'gatsby';

const options = {
	color: '#009ba1',
	showSpinner: false,
};

export const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
	const styles = `
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: ${options.color};
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px ${options.color}, 0 0 5px ${options.color};
        opacity: 1.0;
        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
      }
    `;

	const node = document.createElement('style');
	node.id = 'nprogress-styles';
	node.innerHTML = styles;
	document.head.appendChild(node);
	NProgress.configure(options);

	NProgress.start();
};

export const onInitialClientRender: GatsbyBrowser['onInitialClientRender'] =
	() => {
		NProgress.done();
	};

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = () => {
	NProgress.done();
};

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = GatsbyRecoil;

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = PageRoot;
