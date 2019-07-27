// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require('path');

function addStyleResource(rule) {
	rule.use('style-resource')
		.loader('style-resources-loader')
		.options({
			patterns: [path.resolve(__dirname, './src/assets/style/include.scss')],
		})
}

module.exports = {
	siteName: '@woubuc',
	siteUrl: 'https://blog.woubuc.be',

	chainWebpack(config) {
		['vue-modules', 'vue', 'normal-modules', 'normal'].forEach(type => {
			addStyleResource(config.module.rule('scss').oneOf(type));
		});
	},

	plugins: [
		{ // Subjects
			use: '@gridsome/source-filesystem',
			options: {
				typeName: 'Subject',
				path: 'content/subjects/**/*.md',
				route: '/subject/:id',
			},
		},
		{ // Authors
			use: '@gridsome/source-filesystem',
			options: {
				typeName: 'Author',
				path: 'content/authors/**/*.md',
				route: '/author/:id',
			},
		},
		{ // Posts
			use: '@gridsome/source-filesystem',
			options: {
				typeName: 'Post',
				path: 'content/posts/**/*.md',
				route: '/post/:title',
				refs: {
					tags: {
						typeName: 'Tag',
						route: '/tag/:title',
						create: true,
					},

					subjects: 'Subject',
					author: 'Author',
				},
			},
		},

		{
			use: '@gridsome/plugin-sitemap',
			options: {
				config: {
					'/': { changefreq: 'weekly' },
					'/post/*': { changefreq: 'monthly' },
					'/subject/*': { changefreq: 'weekly' },
					'/author/*': { changefreq: 'weekly' },
					'/tag/*': { changefreq: 'weekly' },
				},
			},
		},
		{
			use: 'gridsome-plugin-feed',
			options: {
				contentTypes: ['Post'],
				rss: { enabled: true },
				atom: { enabled: true },
				json: { enabled: true },
				filterNodes: node => node.published,
				nodeToFeedItem: node => ({
					title: node.title,
					date: node.date,
					description: node.description,
				}),
			},
		}
	],

	transformers: {
		//Add markdown support to all file-system sources
		remark: {
			externalLinksTarget: '_blank',
			externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
			anchorClassName: 'icon icon-link',
			plugins: [],
		},
	},
};
