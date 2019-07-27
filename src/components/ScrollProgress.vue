<template>
	<div class="scroll-process" :style="{ background: colour, width }"></div>
</template>

<script>
export default {
	props: {
		name: { type: String, required: true },
		colour: { type: String, required: true },
	},

	data() {
		return {
			width: '0%',
			sent50: false,
			sent100: false,
		};
	},

	mounted() {
		window.addEventListener('scroll', this.onScroll, { capture: true, passive: true });
	},

	beforeDestroy() {
		window.removeEventListener('scroll', this.onScroll);
	},

	methods: {
		onScroll() {
			const pct = window.pageYOffset / (document.body.clientHeight - window.innerHeight);
			this.width = `${ pct * 100 }%`;

			if (pct > 0.5 && !this.sent50) {
				this.sent50 = true;
				this.sendGaEvent('scroll', 50);
			}

			if (pct > 0.95 && !this.sent100) {
				this.sent100 = true;
				this.sendGaEvent('scroll', 100);
			}
		},

		sendGaEvent(event, value) {
			try { // Wrap in try/catch in case `gtag` isn't loaded yet or is blocked by an ad blocker
				gtag('event', 'Post', {
					event_category: event,
					event_label: this.name,
					value: value,
				});
			} catch (err) { }
		}
	},
}
</script>

<style lang="scss" scoped>
.scroll-process {
	position: fixed;
	top: 0;
	left: 0;

	width: 0;
	height: 2px;
}
</style>
