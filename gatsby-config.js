module.exports = {
	siteMetadata: {
		siteUrl: 'https://www.talaxy.site',
		title: '雪山深处',
		author: {
			name: 'Talaxy',
			summary: '准备暑期实习中······',
		},
		description: '一个个人博客，记录所思所想',
		social: {
			twitter: 'Taozc009',
			github: 'Talaxy009',
			pixiv: '009ba1',
		},
	},
	plugins: [
		'gatsby-plugin-emotion',
		'gatsby-plugin-material-ui',
		'gatsby-plugin-image',
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: 'UA-158975002-1',
			},
		},
		{
			resolve: 'gatsby-plugin-next-seo',
			options: {
				openGraph: {
					url: 'https://www.talaxy.site/',
					type: 'website',
					locale: 'zh_cn',
					site_name: '雪山深处',
				},
				twitter: {
					handle: '@Taozc009',
					cardType: 'summary_large_image',
				},
			},
		},
		'gatsby-plugin-sitemap',
		'gatsby-plugin-twitter',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: "Taozc's Blog",
				short_name: 'Taozc',
				lang: 'zh',
				start_url: '/',
				background_color: '#ffffff',
				theme_color: '#009ba1',
				display: 'minimal-ui',
				icon: 'src/assets/images/icon.png',
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 700,
						},
					},
					'gatsby-remark-prismjs',
					{
						resolve: 'gatsby-remark-link-beautify',
						options: {
							screenshotQuality: 90,
							timeout: 50000,
							puppeteerLaunchArgs: [
								'--no-first-run',
								'--proxy-server=yacd.io:7890',
							]
						},
					},
				],
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-plugin-use-dark-mode',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: './src/assets/images/',
			},
			__key: 'images',
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'pages',
				path: './src/pages/',
			},
			__key: 'pages',
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'blogs',
				path: './content/blogs/',
			},
			__key: 'blogs',
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'mdPages',
				path: './content/pages/',
			},
			__key: 'mdPages',
		},
		{
			resolve: 'gatsby-plugin-valine',
			options: {
				appId: 'uNA1YWiX0B1smHYzKFAUD9kS-9Nh9j0Va',
				appKey: 'uTK9cTmOLI8pQ7WSGGmKMP2K',
				placeholder: '你知道吗？Home 键可以把光标放到行首诶！',
				avatar: 'mp',
				pageSize: 5,
			},
		},
		{
			resolve: 'gatsby-plugin-feed',
			options: {
				query: `
				{
					site {
						siteMetadata {
							title
					  		description
					  		siteUrl
					  		site_url: siteUrl
						}
				  	}
				}`,
				feeds: [
					{
						serialize: ({query: {site, allMarkdownRemark}}) => {
							return allMarkdownRemark.edges.map((edge) => {
								return Object.assign(
									{},
									edge.node.frontmatter,
									{
										description:
											edge.node.frontmatter.description,
										date: edge.node.frontmatter.date,
										url:
											site.siteMetadata.siteUrl +
											edge.node.fields.slug,
										guid:
											site.siteMetadata.siteUrl +
											edge.node.fields.slug,
										custom_elements: [
											{'content:encoded': edge.node.html},
										],
									},
								);
							});
						},
						query: `
						{
					  		allMarkdownRemark(
								filter: {fileAbsolutePath: {regex: "/blogs/"}}
								sort: { order: DESC, fields: [frontmatter___date] },
					  		) {
								edges {
									node {
										html
										fields { slug }
										frontmatter {
											description
							  				title
							  				date
										}
							  		}
								}
						  	}
						}`,
						output: '/rss.xml',
						title: '雪山深处的 RSS Feed',
						match: '^/blogs/',
					},
				],
			},
		},
	],
};
