import React from 'react';
import PropTypes from 'prop-types';
import {GatsbySeo} from 'gatsby-plugin-next-seo';
import {useStaticQuery, graphql} from 'gatsby';

export default function SEO({description, image, lang, title}) {
	const data = useStaticQuery(graphql`
		{
			site {
				siteMetadata {
					siteUrl
					title
				}
			}
		}
	`);
	const siteName = data.site.siteMetadata.title;
	const siteUrl = data.site.siteMetadata.siteUrl;

	return (
		<GatsbySeo
			htmlAttributes={{
				lang,
			}}
			title={title ? title : siteName}
			titleTemplate={title ? `%s | ${siteName}` : null}
			openGraph={{
				title: title ? `${title} | ${siteName}` : siteName,
				description: description,
				images: [{url: siteUrl + image}],
				site_name: siteName,
			}}
		/>
	);
}

SEO.defaultProps = {
	lang: 'zh',
	image: '/site-image.jpg',
	description: '',
	title: '',
};

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	image: PropTypes.string,
	title: PropTypes.string.isRequired,
};
