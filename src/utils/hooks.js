import React from 'react';
import {graphql, useStaticQuery} from 'gatsby';

/**
 * 当页面加载完成时由 false 变为 true
 * @returns {boolean} hasMounted
 */
export function useHasMounted() {
	const [hasMounted, setHasMounted] = React.useState(false);
	React.useEffect(() => {
		setHasMounted(true);
	}, []);
	return hasMounted;
}

/**
 * 获取 siteMetadata
 * @returns {object} siteMetadata
 */
export function useSiteMetadata() {
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					siteUrl
					description
					author {
						name
						summary
					}
					social {
						twitter
						github
						pixiv
					}
				}
			}
		}
	`);
	return data.site.siteMetadata;
}
