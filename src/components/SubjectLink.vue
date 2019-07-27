<template>
	<g-link class="subject-link" :to="subject.path" :style="{ color: colour.darken(0.25), background: colour.alpha(0.15) }">
		<g-image class="logo" :src="subject.logo" />
		<span class="title">{{ subject.title }}</span>
	</g-link>
</template>

<script>
import Color from 'color';

export default {
	props: {
		subject: { type: Object, required: true },
	},

	computed: {
		colour() { return Color(this.subject.colour) }
	},
};
</script>

<style lang="scss" scoped>
.subject-link {
	display: inline-flex;
	align-items: center;

	height: 32px;
	margin: 4px 4px 4px 0;
	padding: 0 12px;

	border-radius: 16px;
	font-size: 0.9rem;

	&:hover { text-decoration: none }
	&:hover > .title { text-decoration: underline }
}

.title { font-weight: 600 }
.logo { margin-right: 6px }
</style>
