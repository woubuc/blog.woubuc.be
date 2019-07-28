<template>
	<footer class="post-tags">
		<section>
			<strong>Tagged</strong>
			<div>
				<g-link class="post-tag" v-for="subject in post.subjects" :key="subject.id" :to="subject.path">{{ subject.title.toLowerCase() }}</g-link>
				<g-link class="post-tag" v-for="tag in post.tags" :key="tag.id" :to="tag.path">{{ tag.title.toLowerCase() }}</g-link>
			</div>
		</section>
	</footer>
</template>

<script>
export default {
	props: {
		post: { type: Object, required: true },
	},
}
</script>

<style lang="scss" scoped>
.post-tags {
	max-width: 780px;
	margin: auto;
	padding: 30px;

	section {
		display: flex;

		padding: 20px 0;
		border-top: 1px solid $border;
		border-bottom: 1px solid $border;

		> strong { margin-right: 10px }

		> div {
			display: flex;
			flex-wrap: wrap;

			> * { margin-right: 10px }
			> *:last-child { margin-right: 0 }
		}

	}
}
</style>
