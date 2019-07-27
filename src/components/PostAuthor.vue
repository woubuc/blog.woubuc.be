<template>
	<div class="post-author">
		<div class="inner">
			<g-image class="avatar" role="presentation" :src="author.image" />
			<div>
				<div class="name">Written by <strong>{{ author.name }}</strong></div>
				<div class="links">
					<a v-if="author.twitter"
					   :href="`https://twitter.com/${ author.twitter }`"
					   target="_blank"
					   rel="noreferrer noopener nofollow">@{{ author.twitter }}</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		author: { type: Object, required: true },
	},
}
</script>

<style lang="scss" scoped>
.post-author {
	padding: 10px 30px 40px 30px;

	@include min-width() {
		height: 0;
		padding: 0 30px;
		margin-top: 80px;
		background: $background;
	}
}

.inner {
	display: flex;
	align-items: center;
	max-width: 720px;
	margin: auto;

	@include min-width() {
		position: relative;
		height: 100px;
		top: -50px;
	}
}

.avatar {
	width: 68px;
	height: 68px;
	margin-right: 10px;
	border-radius: 50%;
	border: none;

	@include min-width() {
		width: 100px;
		height: 100px;
		margin-left: -8px;
		border: 8px solid white;
	}
}

.name {
	line-height: 120%;

	@include min-width() {
		line-height: inherit;
		height: 30px;
	}
}

.links {
	font-size: 0.9rem;
}
</style>
