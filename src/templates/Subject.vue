<template>
	<ColumnsLayout>

		<template slot="side">
			<v-style>
				.subject a { color: {{ colour.darken(0.2) }}; }
			</v-style>

			<div class="subject-info">
				<g-image class="logo" :src="$page.subject.logo" />

				<div>
					<h1>{{ $page.subject.title }}</h1>
					<a :href="$page.subject.homepage" target="_blank" rel="noreferrer noopener nofollow">{{ displayUrl }}</a>
					<div class="description" v-html="$page.subject.content"></div>
				</div>
			</div>
		</template>

		<template slot="right">
			<div class="posts">
				<post-tile :hide-subject="$page.subject.id" v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node"/>
			</div>
		</template>
	</ColumnsLayout>
</template>

<page-query>
query Subject ($id: ID!) {
	subject (id: $id) {
		id
		title
		homepage
		logo (width: 120, height: 120, fit: contain)
		colour
		content
	}

	posts: allPost(filter: {
		subjects: { contains: [$id] },
		published: { eq: true },
	}) {
		edges {
			node {
				title
				path
				published
				date
				timeToRead
				description
				content
				subjects { id title colour logo(width: 16, height: 16) path }
			}
		}
	}
}
</page-query>

<script>
import Color from 'color';

import PostTile from '../components/PostTile';

export default {
	components: { PostTile },

	metaInfo: {
		// title: `Everything ${ this.$page.subject.title }`,
	},

	computed: {
		displayUrl() {
			return new URL(this.$page.subject.homepage).hostname;
		},
		colour() {
			return Color(this.$page.subject.colour);
		}
	}
}
</script>

<style lang="scss" scoped>
.subject-info {
	> .logo {
		display: none;
		margin: auto;
	}

	h1 { margin-bottom: -2px }
	.description { padding-top: 10px }
	.description /deep/ p:last-child { padding-bottom: 0 }

	@include min-width(820px) {
		> .logo { display: block }
		> div { padding-top: 20px }
	}

}


</style>

