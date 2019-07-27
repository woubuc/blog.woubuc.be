<template>
	<Layout wide>
		<h1>Everything by {{ $page.author.name }}</h1>

		<div class="posts">
			<post-tile :hide-subject="$page.author.id" v-for="edge in $page.author.belongsTo.edges" :key="edge.node.id" :post="edge.node"/>
		</div>
	</Layout>
</template>

<page-query>
query Author ($id: String!) {
	author (id: $id) {
		id
		name

		belongsTo {
			edges {
				node {
					...on Post {
						title
						path
						date
						timeToRead
						description
						content
						subjects { id title path }
					}
				}
			}
		}
	}
}
</page-query>

<script>
import PostTile from '../components/PostTile';

export default {
	components: { PostTile },

	metaInfo() {
		return {
			title: `Everything by ${ this.$page.author.name }`
		};
	},
}
</script>

<style lang="scss" scoped>

</style>

