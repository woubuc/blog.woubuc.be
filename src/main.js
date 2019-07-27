// Import main css
import '~/assets/style/global.scss';

// Import default layout so we don't need to import it to every page
import DefaultLayout from '~/layouts/Default.vue';
import ColumnsLayout from '~/layouts/Columns.vue';

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { head }) {

	head.link.push({ rel: 'manifest', href: '/site.webmanifest' });

	Vue.component('v-style', {
		render(h) { return h('style', this.$slots.default) },
	});

	Vue.component('Layout', DefaultLayout);
	Vue.component('ColumnsLayout', ColumnsLayout)
}
