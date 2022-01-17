import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {useStaticQuery, graphql} from 'gatsby';

export default function SEO({description, image, lang, meta, title}) {
	const data = useStaticQuery(graphql`
		{
			site {
				siteMetadata {
					siteUrl
				}
			}
		}
	`);

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
					property: 'og:image',
					content: data.site.siteMetadata.siteUrl + image,
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
	image: '/site-image.jpg',
	meta: [],
	description: '',
};

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	image: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string.isRequired,
};
