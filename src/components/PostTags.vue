<template>
	<footer class="post-tags">
		<section>
			<strong>Tagged</strong>
			<g-link class="post-tag" v-for="tag in tags" :key="tag.id" :to="tag.path">{{ tag.title.toLowerCase() }}</g-link>
		</section>
	</footer>
</template>

<script>
export default {
	props: {
		tags: { type: Array, required: true },
	},
}
</script>

<style lang="scss" scoped>
.post-tags {
	max-width: 780px;
	margin: auto;
	padding: 30px;

	section {
		padding: 20px 0;
		border-top: 1px solid $border;
		border-bottom: 1px solid $border;

		> * { margin-right: 10px }
	}
}
</style>
