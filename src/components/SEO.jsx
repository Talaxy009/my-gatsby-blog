import React from 'react';
import {Helmet} from 'react-helmet-async';
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
					title
					siteUrl
					description
					social {
						twitter
					}
				}
			}
		}
	`);

	const {
		title: siteName,
		siteUrl,
		description: siteDescription,
		social: {twitter},
	} = data.site.siteMetadata;

	const metaTitle = title ? `${title} | ${siteName}` : siteName;
	const metaDescription = description || siteDescription;
	const metaImage = `${siteUrl}${image}`;

	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}>
			<title>{metaTitle}</title>
			<meta name="description" content={metaDescription} />
			<meta name="og:title" content={metaTitle} />
			<meta name="og:site_name" content={siteName} />
			<meta name="og:description" content={metaDescription} />
			<meta name="og:image" content={metaImage} />
			<meta name="og:type" content="website" />
			<meta name="og:url" content={siteUrl} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:creator" content={`@${twitter}`} />
		</Helmet>
	);
}
