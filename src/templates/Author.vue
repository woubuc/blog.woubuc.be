<template>
	<Layout narrow>
		<div class="title">
			<h1>{{ title }}</h1>
		</div>

		<div class="posts">
			<post-tile :hide-subject="$page.author.id" v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node"/>
		</div>
	</Layout>
</template>

<page-query>
query Author ($id: ID!) {
	author (id: $id) {
		id
		name
	}

	posts: allPost(filter: {
		author: { eq: $id },
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
import PostTile from '../components/PostTile';

export default {
	components: { PostTile },

	components: { PostTile },

	metaInfo() {
		return {
			title: this.title,
		};
	},

	computed: {
		title() { return `Everything by ${ this.$page.author.name }` },
	},
}
</script>

<style lang="scss" scoped>
.title {
	padding: 10px 20px;
}

h1 {
	padding: 20px 0;
	border: 2px solid $border;
	border-left: none;
	border-right: none;
}
</style>

