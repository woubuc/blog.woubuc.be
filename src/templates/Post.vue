<template>
	<Layout>
		<article>
			<v-style>
				.post-content a, .post-tags a, .post-author a, .post-comments a, .site-footer a { color: {{ colour.darken(0.2) }} }
				.post-content a.anchor-link:hover { color: {{ colour }} }
				.post-content p code, .post-content li code {
					background: {{ colour.alpha(0.12) }};
					border: 1px solid {{ colour.alpha(0.4) }};
				}
				.post-files .file-download .button a { background: {{ colour.darken(0.15) }}; }
				.post-files .file-download .button a:hover { background: {{ colour.darken(0.25) }}; }
				.post-content blockquote {
					background: {{ colour.alpha(0.05) }};
					border-color: {{ colour.alpha(0.2) }};
				}
			</v-style>

			<header class="post-header" :style="{ backgroundColor: colour, backgroundImage: cover }">
				<div class="post-header-inner">
					<h1>{{ $page.post.title }}</h1>
					<post-meta post-page :post="$page.post"/>
				</div>
			</header>

			<div v-if="!$page.post.published" class="unpublished-warning">This post is unpublished. It is subject to change and may be removed entirely.<br>Do not share this post until it is published.</div>

			<section class="post-content post-intro">
				<p>{{ $page.post.description }}</p>
			</section>

			<hr class="divider" :style="{ backgroundColor: colour }">

			<section class="post-content post-files" v-if="$page.post.files.length > 0">
				<p><strong>Download associated files</strong></p>
				<file-download class="file-download" v-for="(file, i) in $page.post.files" :key="i" :file="file" />
			</section>

			<section class="post-content" ref="content" v-html="content" />

			<post-comment-links :post="$page.post" />

			<post-tags :post="$page.post"/>

			<post-author :author="$page.post.author" />
		</article>

		<scroll-progress :name="$page.post.title" :colour="colour.string()" />
	</Layout>
</template>

<page-query>
query ($id: ID!) {
	post (id: $id) {
		id
		title
		author { name image(width: 100, height: 100) twitter }
		date (format: "YYYY-MM-DD")
		published
		timeToRead

		description
		content
		colour

		tags { id title path }
		subjects { id title path colour logo(width: 16, height: 16) }
		commentLinks

		files { name size path }

		cover: image(width: 1920, height: 400, blur: 20)
		ogImage: image(width: 400, height: 400)
	}

	metadata {
		siteUrl
	}
}
</page-query>

<script>
import Color from 'color';

import PostMeta from '~/components/PostMeta';
import PostTags from '~/components/PostTags';
import ScrollProgress from '../components/ScrollProgress';
import initHighlightJs from '../highlight';
import FileDownload from '../components/FileDownload';
import PostAuthor from '../components/PostAuthor';
import PostCommentLinks from '../components/PostCommentLinks';

export default {
	components: { PostCommentLinks, PostAuthor, FileDownload, ScrollProgress, PostMeta, PostTags },

	metaInfo() {
		const tags = [].concat(this.$page.post.subjects, this.$page.post.tags).map(t => t.title);

		const robots = [];
		if (!this.$page.post.published) robots.push({ name: 'robots', content: 'noindex' });

		return {
			title: this.$page.post.title,
			meta: [
				{ name: 'description', content: this.$page.post.description },
				{ name: 'keywords', content: tags.join(', ') },
				{ name: 'robots', content: this.$page.post.published ? 'index' : 'noindex' },
				...robots,

				{ property: 'og:title', content: this.$page.post.title },
				{ property: 'og:description', content: this.$page.post.description },
				{ property: 'og:url', content: this.postUrl },
				{ property: 'og:image', content: this.ogImage },
				{ property: 'og:type', content: 'article' },
				{ property: 'article:published_time', content: this.created.toISOString() },
				{ property: 'article:author', content: this.$page.post.author.name },
				...tags.map(tag => ({ property: 'article:tag', content: tag })),

				{ name: 'twitter:card', content: 'summary' },
				{ name: 'twitter:title', content: this.$page.post.title },
				{ name: 'twitter:description', content: this.$page.post.description },
				{ name: 'twitter:site', content: '@woubuc' },
				{ name: 'twitter:creator', content: `@${ this.$page.post.author.twitter }` },
				{ name: 'twitter:image', content: this.ogImage },
			],
			link: [
				{ rel: 'canonical', href: this.postUrl },
			],
			bodyAttrs: { class: 'post-page' },
		};
	},

	mounted() {
		initHighlightJs(this.$refs.content);
	},

	computed: {
		created() { return new Date(this.$page.post.date) },
		postUrl() { return this.$page.metadata.siteUrl + this.$page.post.path + '/' },

		cover() {
			if (!this.$page.post.cover) return '';
			return `url(${ this.$page.post.cover.src })`;
		},
		colour() {
			return Color(this.$page.post.colour || 'black');
		},

		ogImage() {
			if (!this.$page.post.ogImage) return '';
			return this.$page.metadata.siteUrl + this.$page.post.ogImage.src;
		},

		content() {
			// Prepend '#' links before each h2 title
			return this.$page.post.content.replace(/(<h2 id="([^"]+)">)(.+)(<\/h2+>)/g,
				`$1<a class="anchor-link" href="#$2">#</a> <span>$3</span> $4`);
		}
	},
}
</script>

<style lang="scss" scoped>
.post-header, .post-header-background {
	background: transparent no-repeat center;
	background-size: cover;
}
.post-header-inner {
	padding: 15vh 0;

	background: linear-gradient(to bottom,
		rgba(black, 0.35) 0%,
		rgba(black, 0.25) 3%,
		rgba(black, 0.25) 97%,
		rgba(black, 0.35) 100%);
	text-align: center;
	text-shadow: 0 0 10px rgba(black, 0.2);

	> h1 {
		font-size: 2.2rem;
		color: white;
		margin: auto;
	}
}

.unpublished-warning {
	padding: 20px 30px;

	color: white;
	background: #f70;

	text-align: center;
	font-size: 0.9rem;
	font-weight: 600;
	line-height: 1.1rem;

	&::before {
		display: block;
		content: '!';

		width: 25px;
		height: 25px;
		line-height: 25px;
		margin: auto;
		margin-bottom: 10px;

		color: white;
		background: #ff3700;
		border-radius: 50%;
		font-size: 1.1rem;
	}
}

hr {
	width: 60px;
	height: 3px;
	margin: 30px auto;
	border: none;
	background: #e0e2e4;
}

.post-files p { padding-bottom: 0 }

.post-content {
	width: 100%;
	max-width: 820px;
	margin: auto;
	padding: 0 30px;
}

.post-content.post-intro {
	padding-top: 30px;
	font-size: 1.1rem;

	@include min-width() {
		padding-top: 80px;
		padding-bottom: 20px;
	}
}

.post-content /deep/ {
	ul, ol {
		margin-left: 20px;
		padding-bottom: 30px;
	}

	h2 { font-size: 1.6rem }
	h3 { font-size: 1.3rem }
	h4 { font-size: 1.15rem }
	h5 { font-size: 1rem }

	h2, h3, h4, h5 { padding: 1em 0 .4em 0 }
	p + h3, p + h4, p + h5 { padding-top: 0.4em }

	h2 {
		padding-top: 60px;
		display: flex;
	}

	img {
		width: calc(100% + 60px);
		max-width: calc(100% + 60px);
		margin: 0 -30px;
	}

	a.anchor-link {
		flex-shrink: 0;
		width: 30px;
		margin-left: -30px;
		padding-right: 4px;
		text-align: right;
		text-decoration: none;
		color: #e0e2e4;
		transition: color 80ms ease-out;
	}

	p code, li code {
		padding: 2px 4px;
		border-radius: 3px;
		font-size: 0.8rem;
		font-style: normal;
	}

	blockquote {
		padding: 20px 30px;
		margin-bottom: 30px;
		border-width: 2px;
		border-style:solid;
		border-left: none;
		border-right: none;

		font-size: 0.9rem;
		font-style: italic;

		p code, li code  { font-size: 0.74rem }

		p { padding-bottom: 20px }
		p:last-child { padding-bottom: 0 }
	}
}

hr + .post-content /deep/ > p:first-child {
	padding-top: 20px;
}

@media all and (min-width: 820px) {
	.post-header-inner > h1 {
		font-size: 2.8rem;
		max-width: 700px;
		margin: auto;
	}

	.post-content { padding: 0 }

	.file-download {
		margin-left: 50px;
		margin-right: 50px;
	}

	.post-content /deep/ {
		p, h3, h4, h5, ul, ol {
			padding-left: 50px;
			padding-right: 50px;
		}

		img {
			width: calc(100% + 100px);
			max-width: calc(100% + 100px);
			margin: 0 -50px;
			border-radius: 5px;
		}

		a.anchor-link {
			width: 50px;
			margin-left: 0;
			padding-right: 6px;
		}

		blockquote {
			margin-left: 50px;
			margin-right: 50px;

			p {
				padding-left: 0;
				padding-right: 0;
			}
		}
	}

	hr + .post-content /deep/ > p:first-child {
		padding-top: 30px;
	}
}
</style>
