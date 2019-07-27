<template functional>
	<Layout wide>
		<div class="column-container">
			<div class="column-left">
				<div class="side">
					<slot name="side"></slot>
				</div>
			</div>

			<div class="column-right">
				<slot name="right"></slot>
			</div>
		</div>
	</Layout>
</template>

<style lang="scss" scoped>
.column-container {
	padding: 0 20px;

	@include min-width() {
		padding: 0 30px;
	}

	@include min-width(820px) {
		display: flex;
		justify-content: center;
		padding: 0 50px;
	}
}

.column-left {
	flex-shrink: 0;

	@include min-width(820px) {
		width: 220px;
	}
}

.column-right {
	flex-grow: 1;

	@include min-width(820px) {
		max-width: 680px;
	}
}

.side {
	margin: 10px 0;
	padding: 18px;
	border: 2px solid $border;
	border-radius: 6px;

	@include min-width(820px) {
		margin-top: 16px;
		margin-right: 16px;

		> ul { display: block }
	}
}
</style>
