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

// Get the title of the post to send to GA with our custom events
const postTitle = document.querySelector('.post-header__inner h1').textContent;

/**
 * Sends a scroll event to Google Analytics
 * @param pct - Percentage scrolled as an integer from 0-100
 */
function sendEvent(pct) {
	try { // Wrap GA call in try/catch so the rest of the script still works if GA is blocked
		ga('send', 'event', 'Post', 'sroll', postTitle, pct);
	} catch (err) { }
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
		sendEvent(50);
	}

	if (pct > 0.95 && !sent100) {
		sent100 = true;
		sendEvent(100);
	}
}

// Attach event handler
window.addEventListener('scroll', onScroll, {
	capture: true,
	passive: true,
});
