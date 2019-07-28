<template>
	<article class="post-tile">
		<h1><g-link class="title" :to="post.path">{{ post.title }}</g-link></h1>
		<post-meta :post="post" :hide-subject="hideSubject" />

		<p class="description">{{ post.description }}</p>

		<p class="read-link"><g-link :to="post.path">Read Now</g-link></p>
	</article>
</template>

<script>
import PostMeta from '~/components/PostMeta';

export default {
	components: { PostMeta },

	props: {
		post: { type: Object, required: true },
		hideSubject: { type: String, default: '' },
	},
}
</script>

<style lang="scss" scoped>
.post-tile {
	padding: 20px;
}

.title {
	font-size: 1.8rem;
	color: $text-light;
	text-align: center;
}

.post-tile-meta {
	display: flex;
	align-items: center;

	> * {
		margin-right: 12px;
	}
}

.description {
	padding-bottom: 10px;
}
.description, .read-link { text-align: left }
</style>
