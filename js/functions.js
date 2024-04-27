/* Remove JS comments marked with 'REMOVE' before deploying to production */

if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
	console.log('The device is touch-enabled.');
	// document.querySelector('html').classList.add('touch-enabled');
}

function addClassOnScroll() {
	// Listen for the scroll event on the window
	window.addEventListener('scroll', function () {
		// Check if the page has been scrolled down from the top
		if (window.scrollY > 0) {
			// If scrolled down, add the "scrolled" class to the <body> tag
			document.body.classList.add('scrolled');
		} else {
			// If scrolled back to the top, remove the "scrolled" class from the <body> tag
			document.body.classList.remove('scrolled');
		}
	});
}

// Call the function to enable the functionality
addClassOnScroll();

document.addEventListener('DOMContentLoaded', function () {
	const html = document.querySelector('html');
	const primaryNavItems = document.querySelectorAll(
		'.navbar-nav > .nav-item'
	);
	const navItems = document.querySelectorAll('.nav-item');

	/* REMOVE if (html.classList.contains('touch-enabled') || window.innerWidth < 992) {
		navItems.forEach(function (navItem) {
			if (navItem.querySelector('.sub-menu')) {
				navItem.classList.add('has-child');
			}
		});
		primaryNavItems.forEach(function (navItem) {
			// Check if .nav-item contains either .sub-menu or .mega-sub-menu-wrapper as a child
			if (
				navItem.querySelector('.sub-menu') ||
				navItem.querySelector('.mega-sub-menu-wrapper')
			) {
				navItem.classList.add('has-child');

				// Create a new span element
				const span = document.createElement('span');
				span.className = 'expand-children';

				// Prepend the span to the .nav-item
				navItem.insertBefore(span, navItem.firstChild);

				// Add click event listener to span
				span.addEventListener('click', function (event) {
					event.stopPropagation(); // Prevent the event from bubbling up to parent elements
					// Remove 'active' and 'clicked-once' classes from all .nav-item elements
					document
						.querySelectorAll(
							'.nav-item.active, .nav-item.clicked-once'
						)
						.forEach(function (navItem) {
							navItem.classList.remove('active', 'clicked-once');
						});

					// Add 'active' and 'clicked-once' classes to the clicked span's parent .nav-item
					const parentNavItem = this.closest('.nav-item');
					if (parentNavItem) {
						parentNavItem.classList.add('active', 'clicked-once');
					}
				});

				navItem.addEventListener('click', function (event) {
					// Check if the link has been clicked once based on the presence of a class
					const previouslyClicked =
						navItem.classList.contains('clicked-once');
					const allOthers =
						document.querySelectorAll('.clicked-once');

					// Remove active class from all other nav-items and reset their clicked state
					navItems.forEach(function (otherParent) {
						if (otherParent !== parent) {
							otherParent.classList.remove('active');
							// Also remove the 'clicked-once' class from other links
							let otherLink =
								otherParent.querySelector('.nav-link');
							if (otherLink) {
								otherLink.classList.remove('clicked-once');
							}
						}
					});

					if (!previouslyClicked) {
						// First click
						event.preventDefault();
						allOthers.forEach(function (otherParent) {
							otherParent.classList.remove('clicked-once');
						});
						navItem.classList.toggle('active');
						navItem.classList.add('clicked-once');
					} else {
						// On the second click, allow the default action and prepare for future clicks
						// Remove 'clicked-once' class to reset state
						navItem.classList.remove('clicked-once');
					}
				});
			}
		});
	} REMOVE */

	// Desktop only behavior
	/* REMOVE if (window.innerWidth >= 992) { REMOVE */
	primaryNavItems.forEach(function (navItem) {
		navItem.addEventListener('mouseenter', function () {
			const subMenu = navItem.querySelector(':scope > .sub-menu');
			if (subMenu) {
				const parentOffsetLeft = navItem.offsetLeft + 14;
				subMenu.style.paddingLeft = `${parentOffsetLeft}px`;
			}
		});
	});

	// Select all links with a 'data-link' attribute
	const cardLinks = document.querySelectorAll('a[data-link]');
	const navContainer = document.querySelector('#navbarNav'); // Ensure this selector matches your nav container
	let originalActiveCard = document.querySelector('.card.active'); // Store the original active card

	cardLinks.forEach((link) => {
		link.addEventListener('mouseover', function () {
			// Find the currently active '.card' and remove the 'active' class
			const currentActiveCard = document.querySelector('.card.active');
			if (currentActiveCard) {
				currentActiveCard.classList.remove('active');
			}

			// Get the 'data-link' value of the hovered link
			const targetId = this.getAttribute('data-link');

			// Find the '.card' that corresponds to the 'data-nav-target' and add 'active' class
			const targetCard = document.querySelector(
				`.card[data-nav-target="${targetId}"]`
			);
			if (targetCard) {
				targetCard.classList.add('active');
			}

			// Update the originalActiveCard reference to the new active card
			// originalActiveCard = document.querySelector('.card.active');
		});
		link.addEventListener('mouseleave', function () {
			// Remove 'active' class from any currently active card
			const currentActiveCard = document.querySelector('.card.active');
			if (currentActiveCard) {
				currentActiveCard.classList.remove('active');
			}

			// Restore the 'active' class to the original active card
			if (originalActiveCard) {
				originalActiveCard.classList.add('active');
			}
		});
	});

	// Mouseleave event to restore the original '.active' card when hovering off the nav
	navContainer.addEventListener('mouseleave', function () {
		// Remove 'active' class from any currently active card
		const currentActiveCard = document.querySelector('.card.active');
		if (currentActiveCard) {
			currentActiveCard.classList.remove('active');
		}

		// Restore the 'active' class to the original active card
		if (originalActiveCard) {
			originalActiveCard.classList.add('active');
		}
	});
	/* REMOVE } REMOVE */

	// Footer Nav Dropdowns
	const footerNavItems = document.querySelectorAll(
		'.footer-nav .nav-item > .sub-menu'
	);

	footerNavItems.forEach(function (navItem) {
		let parent = navItem.parentNode,
			link = parent.querySelector('.nav-link');
		parent.classList.add('has-child');

		// Add a span element to each nav-item that has the has-child class
		const span = document.createElement('span');
		span.classList.add('expand-children');
		parent.prepend(span);

		link.addEventListener('click', function (event) {
			// Check if the link has been clicked once based on the presence of a class
			const previouslyClicked = link.classList.contains('clicked-once');

			// Remove active class from all other nav-items and reset their clicked state
			document
				.querySelectorAll('.footer-nav .nav-item')
				.forEach(function (otherParent) {
					if (otherParent !== parent) {
						otherParent.classList.remove('active');
						// Also remove the 'clicked-once' class from other links
						let otherLink = otherParent.querySelector('.nav-link');
						if (otherLink) {
							otherLink.classList.remove('clicked-once');
						}
					}
				});

			if (!previouslyClicked) {
				// First click
				event.preventDefault();
				parent.classList.toggle('active');
				link.classList.add('clicked-once');
			} else {
				// On the second click, allow the default action and prepare for future clicks
				// Remove 'clicked-once' class to reset state
				link.classList.remove('clicked-once');
			}
		});
	});

	const recoverySplide = new Splide('.recovery-story-slider', {
		perPage: 4,
		perMove: 1,
		pagination: false,
	});
	const clientSplide = new Splide('.client-slider', {
		// perPage: 6,
		perMove: 1,
		pagination: false,
		autoWidth: true,
		type: 'loop',
	});
	const quoteSlider = new Splide('.client-quote-slider', {
		perPage: 1,
		perMove: 1,
		pagination: false,
		type: 'loop',
	});
	recoverySplide.mount();
	clientSplide.mount();
	quoteSlider.mount();
});
