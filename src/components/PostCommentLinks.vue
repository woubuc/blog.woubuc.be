<template>
	<footer class="post-comments" v-if="hasLinks">
		<section>
			<strong>Join the conversation</strong><br>
			<div>
				<a class="post-comment-link" v-for="link in post.commentLinks" :key="link" :href="link" target="_blank" rel="noreferrer noopener nofollow">{{ hostname(link) }}</a>
			</div>
		</section>
	</footer>
</template>

<script>
export default {
	props: {
		post: { type: Object, required: true },
	},

	computed: {
		hasLinks() {
			if (!Array.isArray(this.post.commentLinks)) return false;
			return this.post.commentLinks.length > 0;
		},
	},

	methods: {
		hostname(url) { return new URL(url).hostname.replace(/^www./, '') },
	},
}
</script>

<style lang="scss" scoped>
.post-comments {
	max-width: 780px;
	margin: auto;
	padding: 30px;
	padding-bottom: 0px;

	section > strong { padding-right: 20px }

	section > div {
		display: flex;
		flex-wrap: wrap;

		> a { margin-right: 20px }
		> a:last-child { margin-right: 0 }
	}
}
</style>
