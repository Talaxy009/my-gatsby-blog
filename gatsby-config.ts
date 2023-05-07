import type {GatsbyConfig} from 'gatsby';

const config: GatsbyConfig = {
	siteMetadata: {
		siteUrl: 'https://www.talaxy.site',
		title: '雪山深处',
		author: {
			name: 'Talaxy',
			summary: '普通大学生，无所事事中······',
			twitter: 'Taozc009',
		},
		description: '一个个人博客，记录所思所想',
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
			resolve: 'gatsby-plugin-waline',
			options: {
				serverURL: 'https://comment.talaxy.site',
				emoji: ['https://unpkg.com/@waline/emojis@1.1.0/tieba'],
			},
		},
		{
			resolve: 'gatsby-plugin-mdx',
			options: {
				extensions: ['.md', '.mdx'],
				mdxOptions: {
					remarkPlugins: [
						require(`remark-gfm`),
					],
				},
				gatsbyRemarkPlugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 800,
						},
					},
					{
						resolve: 'gatsby-remark-autolink-headers',
						options: {
							isIconAfterHeader: true,
							elements: ['h2', 'h3'],
							icon: `<Svg aria-hidden="true" viewBox="0 0 512 512" width="24" height="24">
									<path
										fill="none"
										stroke-width="48"
										stroke="#80808080"
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M200.66 352H144a96 96 0 010-192h55.41M312.59 160H368a96 96 0 010 192h-56.66M169.07 256h175.86" />
								</Svg>`,
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
										'--proxy-server=localhost:7890',
								  ],
						},
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-sharp',
			options: {
				defaults: {
					placeholder: 'blurred',
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
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'pages',
				path: './src/pages/',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'blogs',
				path: './content/blogs/',
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
						serialize: ({query: {site, allMdx}}) => {
							return allMdx.edges.map((edge) => {
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
					  		allMdx(
								filter: {internal: {contentFilePath: {regex: "/blogs/"}}}
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
