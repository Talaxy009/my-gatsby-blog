import React from 'react';
import { useSiteMetadata } from '../utils/hooks';

export default function SEO({
	title = '',
	description = '',
	image = '/site-image.jpg',
}) {
	const siteMetadata = useSiteMetadata();

	const {
		title: siteName,
		siteUrl,
		description: siteDescription,
		social: {twitter},
	} = siteMetadata;

	const metaTitle = title ? `${title} | ${siteName}` : siteName;
	const metaDescription = description || siteDescription;
	const metaImage = `${siteUrl}${image}`;

	return (
		<React.Fragment>
			<title>{metaTitle}</title>
			<meta name="description" content={metaDescription} />
			<meta name="og:title" content={metaTitle} />
			<meta name="og:site_name" content={siteName} />
			<meta name="og:description" content={metaDescription} />
			<meta name="og:image" content={metaImage} />
			<meta name="og:type" content="website" />
			<meta name="og:url" content={siteUrl} />
			<meta name="twitter:image" content={metaImage} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:creator" content={`@${twitter}`} />
		</React.Fragment>
	);
}
