(function() {

	// Get the title of the post to send to GA with our custom events
	const postTitle = document.querySelector('.post-header__inner h1').textContent;

	/**
	 * Sends an event to Google Analytics
	 */
	function sendGaEvent(event, value) {
		try { // Wrap in try/catch in case `gtag` isn't loaded yet or is blocked by an ad blocker
			gtag('event', 'Post', {
				event_category: event,
				event_label: postTitle,
				value: value,
			});
		} catch (err) { }
	}



	function onDownload(evt, el) {
		evt.preventDefault();

		const url = el.getAttribute('href');
		sendGaEvent('download', url);

		const frame = document.createElement('iframe');
		frame.style.display = 'none';
		frame.src = url;
		document.body.appendChild(frame);

		setTimeout(() => document.body.removeChild(frame), 10000);
	}
	document.querySelectorAll('.file__button > a').forEach(el => {
		el.addEventListener('click', (evt) => onDownload(evt, el), true);
	});



	/**
	 * Creates the reading progress element
	 */
	function createElement() {
		const el = document.createElement('div');
		el.role = 'presentation';
		el.id = 'reading-progress';

		document.body.appendChild(el);
		return el;
	}

	// Create the progress bar
	const progress = createElement();

	// Keep track of which scroll events have been tracked
	let sent50 = false;
	let sent100 = false;

	/**
	 * Scroll event handler
	 */
	function onScroll() {
		const pct = window.pageYOffset / (document.body.clientHeight - window.innerHeight);
		progress.style.width = `${ pct * 100 }%`;

		if (pct > 0.5 && !sent50) {
			sent50 = true;
			sendGaEvent('scroll', 50);
		}

		if (pct > 0.95 && !sent100) {
			sent100 = true;
			sendGaEvent('scroll', 100);
		}
	}

	// Attach event handler
	window.addEventListener('scroll', onScroll, { capture: true, passive: true });
})();
