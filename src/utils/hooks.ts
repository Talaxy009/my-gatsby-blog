import React from 'react';
import {graphql, useStaticQuery} from 'gatsby';

type SiteInfo = {
	buildTime: string,
	siteMetadata: Queries.SiteMetadata,
}

/**
 * 当页面加载完成时由 false 变为 true
 * @returns {boolean} hasMounted
 */
export function useHasMounted(): boolean {
	const [hasMounted, setHasMounted] = React.useState(false);
	React.useEffect(() => {
		setHasMounted(true);
	}, []);
	return hasMounted;
}

/**
 * 获取网站信息的 GraphQL 钩子
 * @returns {SiteInfo} siteInfo
 */
export function useSiteInfo(): SiteInfo {
	const data = useStaticQuery(graphql`
		query SiteInfo {
			site {
				buildTime
				siteMetadata {
					title
					siteUrl
					description
					author {
						name
						summary
						twitter
					}
				}
			}
		}
	`);
	return data.site;
}
