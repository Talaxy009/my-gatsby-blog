import type {GatsbyConfig} from 'gatsby';

const config: GatsbyConfig = {
	siteMetadata: {
		siteUrl: 'https://www.talaxy.site',
		title: '雪山深处',
		author: {
			name: 'Talaxy',
			summary: '普通大学生，无所事事中······',
		},
		description: '一个个人博客，记录所思所想',
		social: {
			twitter: 'Taozc009',
			github: 'Talaxy009',
			pixiv: '009ba1',
			youtube: 'taozc009'
		},
	},
	graphqlTypegen: true,
	plugins: [
		'gatsby-plugin-emotion',
		'gatsby-plugin-material-ui',
		'gatsby-plugin-image',
		{
			resolve: 'gatsby-plugin-google-gtag',
			options: {
				trackingIds: ['G-6SQBBZZSQN'],
				gtagConfig: {
					anonymize_ip: true,
				},
			},
		},
		'gatsby-plugin-sitemap',
		'gatsby-plugin-twitter',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: '雪山深处',
				short_name: '雪山深处',
				lang: 'zh',
				start_url: '/',
				background_color: '#ffffff',
				theme_color: '#009ba1',
				display: 'minimal-ui',
				icon: 'src/assets/images/icon.png',
			},
		},
		{
			resolve: 'gatsby-plugin-valine-comment',
			options: {
				appId: 'uNA1YWiX0B1smHYzKFAUD9kS-9Nh9j0Va',
				appKey: 'uTK9cTmOLI8pQ7WSGGmKMP2K',
				placeholder: '你知道吗？Home 键可以把光标放到行首诶！',
				pageSize: 5,
				pure: true,
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
							timeout: 50000,
							showFavicon: false,
							screenshotQuality: 90,
							enableLinkPreview: Boolean(process.env.CI),
							puppeteerLaunchArgs: process.env.CI
								? ['--no-first-run']
								: [
										'--no-first-run',
										'--proxy-server=clash.io:7890',
								  ],
						},
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-sharp`,
			options: {
				defaults: {
					placeholder: `blurred`,
					quality: 80,
				},
			},
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-use-dark-mode',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'assets',
				path: './src/assets/',
				fastHash: true,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'pages',
				path: './src/pages/',
				fastHash: true,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'blogs',
				path: './content/blogs/',
				fastHash: true,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'mdPages',
				path: './content/pages/',
				fastHash: true,
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
									},
								);
							});
						},
						query: `
						{
					  		allMarkdownRemark(
								filter: {fileAbsolutePath: {regex: "/blogs/"}}
								sort: {frontmatter: {date: DESC}}
					  		) {
								edges {
									node {
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
					},
				],
			},
		},
	],
};

export default config;
