<template>
	<div class="file-download">
		<div class="button">
			<a :download="file.name" :href="file.path.src">Download</a>
		</div>
		<div class="info">
			<div class="name">{{ file.name }}</div>
			<div class="size">{{ file.size }}</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		file: { type: Object, required: true },
	}
}
</script>

<style lang="scss" scoped>
$break: 580px;

.file-download {
	display: flex;
	align-items: center;
	flex-wrap: wrap;

	padding: 20px;
	padding-bottom: 16px;
	border: 2px solid $border;
	border-radius: 6px;

	@include min-width($break) {
		padding-top: 16px;
	}
}

.button {
	flex-basis: 100%;

	@include min-width($break) {
		flex-basis: 0;
		margin-right: 20px;
	}

	a {
		display: block;
		padding: 6px 12px;

		color: white;
		background: $action;
		border-radius: 3px;
		transition: all 60ms ease-out;
		text-align: center;
	}

	a:hover {
		background: $action-dark;
		text-decoration: none;
	}
}

.info {
	display: flex;
	align-items: center;

	flex-grow: 1;
	flex-basis: 100%;

	@include min-width($break) {
		flex-basis: 0;
		display: block;
	}
}

.name {
	flex-grow: 1;
	font-weight: 600;
}
.size {
	line-height: 100%;
	font-size: 0.8rem;
	color: $text-light;

	@include min-width($break) {
		padding-bottom: 6px;
	}
}

</style>
