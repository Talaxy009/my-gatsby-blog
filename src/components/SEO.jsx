import React from 'react';
import {GatsbySeo} from 'gatsby-plugin-next-seo';
import {useStaticQuery, graphql} from 'gatsby';

export default function SEO({
	title = '',
	lang = 'zh',
	description = '',
	image = '/site-image.jpg',
}) {
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
