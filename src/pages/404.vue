<template>
	<layout narrow>
		<g-image src="~/assets/images/404.jpg" width="680" height="320" :immediate="true" />
		<section>
			<h1>404</h1>
			<p>That page doesn't seem to exist. <g-link to="/">Back to home</g-link></p>
		</section>
	</layout>
</template>

<script>
export default {
	components: { },

	metaInfo: {
		title: 'Page not found',
	},
}
</script>

<style lang="scss" scoped>
img { border-radius: 6px }
h1 { font-size: 1.8rem }
section { padding: 10px 20px }
</style>
