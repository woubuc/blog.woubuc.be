<template>
	<g-link to="/" class="title">{{ $static.metadata.siteName }}</g-link>
</template>

<static-query>
query {
	metadata { siteName }
}
</static-query>

<style lang="scss" scoped>
.title {
	display: inline-block;
	padding: 0 20px;

	font-family: 'Montserrat', sans-serif;
	font-size: 1.3rem;
	font-weight: 600;
	color: $text;

	&:link { text-decoration: none }
}
</style>
