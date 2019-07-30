<template>
	<columns-layout>
		<template slot="side">
			<div class="subjects-list">
				<h2>Subjects</h2>

				<ul>
					<li v-for="edge in $page.subjects.edges" :key="edge.node.id" v-if="edge.node.belongsTo.totalCount > 0">
						<subject-link :subject="edge.node" />
					</li>
				</ul>
			</div>
		</template>

		<template slot="right">
			<div class="posts-list">
				<post-tile v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node"/>
			</div>
		</template>
	</columns-layout>
</template>

<page-query>
{
	posts: allPost(filter: { published: { eq: true } }) {
		edges {
			node {
				title
				path
				published
				subjects { id title path colour logo(width: 16, height: 16) }
				date
				timeToRead
				description
			}
		}
	}

	subjects: allSubject {
		edges {
			node {
				id
				title
				path
				colour
				logo (width: 16, height: 16)
				belongsTo { totalCount }
			}
		}
	}
}
</page-query>

<script>
import PostTile from '~/components/PostTile.vue';
import SubjectLink from '../components/SubjectLink';

export default {
	components: { SubjectLink, PostTile },

	metaInfo: {
		title: 'Blog',

		link: [
			{ rel: 'alternate', type: 'application/rss+xml', title: 'RSS feed', href: '/feed.xml' },
			{ rel: 'alternate', type: 'application/atom+xml', title: 'Atom feed', href: '/feed.atom' },
			{ rel: 'alternate', type: 'application/json', title: 'JSON feed', href: '/feed.json' },
		],
	},

	computed: {
		subjects() {
			return this.$page.subjects.edges.map(edge => edge.node);
		}
	}
}
</script>

<style lang="scss" scoped>
.subjects-list {
	> h2 { font-size: 1.1rem }

	> ul {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
	}

	a { padding-right: 15px }

	@include min-width(820px) {
		> ul { display: block }
	}
}
</style>
