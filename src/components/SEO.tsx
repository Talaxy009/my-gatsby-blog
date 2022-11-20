import React from 'react';
import {useSiteMetadata} from '../utils/hooks';

type SEOProps = {
	title?: string | undefined | null;
	description?: string | undefined | null;
	image?: string;
};

export default function SEO({
	title = null,
	description = null,
	image = '/site-image.jpg',
}: SEOProps) {
	const siteMetadata = useSiteMetadata();

	const {
		title: siteName,
		siteUrl,
		description: siteDescription,
		social,
	} = siteMetadata;

	const metaTitle = title ? `${title} | ${siteName}` : siteName;
	const metaDescription = description || siteDescription;
	const metaImage = `${siteUrl}${image}`;

	return (
		<React.Fragment>
			<title>{metaTitle}</title>
			<meta name="description" content={metaDescription} />
			<meta property="og:title" content={metaTitle} />
			<meta property="og:site_name" content={siteName} />
			<meta property="og:description" content={metaDescription} />
			<meta property="og:image" content={metaImage} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={siteUrl} />
			<meta name="twitter:image" content={metaImage} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:creator" content={`@${social.twitter}`} />
			<meta name="twitter:description" content={metaDescription} />
		</React.Fragment>
	);
}
