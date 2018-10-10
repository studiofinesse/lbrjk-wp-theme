/**
* helper function to check whether an element has a specific class
* @param {HTMLElement} el the element
* @param {string} className the class
* @return {boolean} whether the element has the class
*/
function hasClass(el, className) {
	return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
}

/**
* helper function to add a class to an element
* @param {HTMLElement} el the element
* @param {string} className the class
*/
function addClass(el, className) {
	if (el.classList) {
		el.classList.add(className);
	} else if (!hasClass(el, className)) {
		el.className += ' ' + className;
	}
}

var imgContainers;
var len;

if (!Modernizr.objectfit) {
	imgContainers = document.querySelectorAll('.object-fit-container');
	len = imgContainers.length;

	for (var i=0; i<len; i++) {
		var $container = imgContainers[i],
				imgUrl = $container.querySelector('img').getAttribute('src');
		if (imgUrl) {
			$container.style.backgroundImage = 'url(' + imgUrl + ')';
			addClass($container, 'cover');
		}
	}
}