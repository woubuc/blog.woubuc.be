export default async function initHighlightJs(rootElement) {
	const hljs = await import(/* webpackChunkName: 'hljs', webpackPreload: true */ 'highlight.js/lib/highlight');
	const css = await import(/* webpackChunkName: 'hljs', webpackPreload: true */ 'highlight.js/lib/languages/css');
	const xml = await import(/* webpackChunkName: 'hljs', webpackPreload: true */ 'highlight.js/lib/languages/xml');
	const javascript = await import(/* webpackChunkName: 'hljs', webpackPreload: true */ 'highlight.js/lib/languages/javascript');
	const typescript = await import(/* webpackChunkName: 'hljs', webpackPreload: true */ 'highlight.js/lib/languages/typescript');
	const gdscript = await import(/* webpackChunkName: 'hljs', webpackPreload: true */ './gdscript');


	hljs.registerLanguage('css', css.default);
	hljs.registerLanguage('xml', xml.default);
	hljs.registerLanguage('javascript', javascript.default);
	hljs.registerLanguage('typescript', typescript.default);
	hljs.registerLanguage('gdscript', gdscript.default);

	rootElement.querySelectorAll('pre code').forEach(block => hljs.highlightBlock(block));

	await import(/* webpackChunkName: 'hljs', webpackPreload: true */  './style.css');
}
