module.exports = {
	siteMetadata: {
		siteUrl: 'https://www.talaxy.site',
		title: '雪山深处',
		author: {
			name: 'Talaxy',
			summary: '兼职或学习或打游戏中···',
		},
		description: '一个个人博客，记录所思所想',
		social: {
			twitter: 'Taozc009',
			github: 'Talaxy009',
			pixiv: '009ba1',
		},
	},
	plugins: [
		'gatsby-plugin-styled-components',
		'gatsby-plugin-image',
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: 'UA-158975002-1',
			},
		},
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sitemap',
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
				icon: 'src/images/icon.png',
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
				path: './src/images/',
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
			resolve: 'gatsby-plugin-valine',
			options: {
				appId: 'uNA1YWiX0B1smHYzKFAUD9kS-9Nh9j0Va',
				appKey: 'uTK9cTmOLI8pQ7WSGGmKMP2K',
				avatar: 'robohash',
				pageSize: 5,
			},
		},
		{
			resolve: `gatsby-plugin-feed`,
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
				}
			  `,
			  feeds: [
				{
				  serialize: ({ query: { site, allMarkdownRemark } }) => {
					return allMarkdownRemark.edges.map(edge => {
					  return Object.assign({}, edge.node.frontmatter, {
						description: edge.node.excerpt,
						date: edge.node.frontmatter.date,
						url: site.siteMetadata.siteUrl + edge.node.fields.slug,
						guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
						custom_elements: [{ "content:encoded": edge.node.html }],
					  })
					})
				  },
				  query: `
					{
					  allMarkdownRemark(
						sort: { order: DESC, fields: [frontmatter___date] },
					  ) {
						edges {
						  node {
							excerpt
							html
							fields { slug }
							frontmatter {
							  title
							  date
							}
						  }
						}
					  }
					}
				  `,
				  output: "/rss.xml",
				  title: "雪山深处的 RSS Feed",
				  match: "^/blogs/",
				},
			  ],
			},
		  },
	],
};
