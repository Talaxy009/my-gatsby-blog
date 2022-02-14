const NProgress = require('nprogress');
require('./src/styles/style.css');
require('./src/styles/code.css');
require('./src/styles/link.css');

const options = {
	color: '#009ba1',
	showSpinner: false,
};

exports.onClientEntry = () => {
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

exports.onInitialClientRender = () => {
	NProgress.done();
};

exports.onRouteUpdate = () => {
	NProgress.done();
};
