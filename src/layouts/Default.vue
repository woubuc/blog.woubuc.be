<template>
	<div :class="{ wide, narrow }">
		<header class="site-header"><Title /></header>

		<main>
			<slot/>
		</main>

		<footer class="site-footer">
			<div class="inner">
				<p>&copy;2019 Wouter Buckens</p>
				<p><a href="https://github.com/woubuc/blog.woubuc.be" target="_blank">View source on github.com</a></p>
				<hr>
				<p>Powered by <a href="https://gridsome.org/" target="_blank">Gridsome</a> &amp; <a href="https://www.netlify.com/" target="_blank">Netlify</a></p>
			</div>
		</footer>

	</div>
</template>

<script>
import Title from '~/components/Title.vue';

export default {
	components: { Title },

	props: {
		wide: { type: Boolean, default: false },
		narrow: { type: Boolean, default: false },
	},
}
</script>

<style lang="scss" scoped>
.site-header {
	display: flex;
	align-items: center;

	height: 60px;
	max-width: 720px;
	margin: auto;
	padding: 0 20px;

	@include min-width() { padding: 0 30px }
}

.narrow > .site-header { max-width: 740px }
.wide > .site-header {
	max-width: 1000px;

	@include min-width(820px) { padding: 0 50px }
}

main {
	display: block;
	min-height: calc(100vh - 190px);
}

.narrow > main {
	max-width: 720px;
	margin: auto;
	padding: 0 20px;
}

.site-footer {
	display: flex;
	align-items: center;

	height: 100px;
	margin-top: 30px;
	background: $background;
	text-align: center;
	font-size: 0.7rem;
	line-height: 120%;

	p { padding: 2px 0 }

	hr {
		margin: 6px auto;
		height: 0;
	}
}

.site-footer .inner {
	position: relative;
	z-index: 1;
	max-width: 720px;
	margin: auto;
	flex-grow: 1;
}

body.post-page .site-footer {
	margin-top: 0;

	@include min-width() {
		.inner { text-align: right }
	}
}
</style>
