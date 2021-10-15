import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

export default function SEO({description, lang, meta, title}) {
	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={title}
			meta={[
				{
					name: 'description',
					content: description,
				},
				{
					property: 'og:title',
					content: title,
				},
				{
					property: 'og:type',
					content: 'website',
				},
			].concat(meta)}
		/>
	);
}

SEO.defaultProps = {
	lang: 'zh',
	meta: [],
	description: '',
};

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string.isRequired,
};
