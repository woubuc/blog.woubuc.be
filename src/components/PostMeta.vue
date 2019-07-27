<template>
	<div class="post-meta-container" :class="{ postPage, hasSubjects }">
		<template v-if="!postPage">
			<subject-link v-for="subject in subjects"
						  :key="subject.id"
						  :subject="subject"
						  class="post-meta" />
		</template>

		<time class="post-meta">{{ date }}</time>

		<template v-if="postPage">
			<g-link v-for="subject in subjects"
					:key="subject.id"
					:to="subject.path"
					class="post-meta">{{ subject.title }}</g-link>
		</template>

		<span class="post-meta">{{ post.timeToRead }} min read</span>
	</div>
</template>

<script>
import { format } from 'date-fns';
import SubjectLink from './SubjectLink';

export default {
	components: { SubjectLink },
	props: {
		post: { type: Object, required: true },
		postPage: { type: Boolean, default: false },
		hideSubject: { type: Number, default: -1 },
	},

	computed: {
		date() { return format(new Date(this.post.date), 'MMM d, yyyy') },
		subjects() { return this.post.subjects.filter(s => s.id !== this.hideSubject) },
		hasSubjects() { return this.subjects.length > 0 },
	},
}
</script>

<style lang="scss">
.post-meta-container {
	display: flex;
	flex-wrap: wrap;
	align-items: center;

	padding-bottom: 4px;

	&.postPage {
		justify-content: center;
		> .post-meta { color: rgba(white, 0.7) }
	}

	&.hasSubjects {
		padding-top: 6px;
	}
}
.post-meta {
	display: inline-block;
	padding: 2px 10px;
	color: $text-verylight;

	&:first-child:not(.subject-link) { padding-left: 0 }
	&:last-child { padding-right: 0 }
}
</style>
