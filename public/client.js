/* globals NProgress */

// Load pages using AJAX for a speed boost
var cache = Object.create(null); // Don’t include default Object properties
document.addEventListener('click', function (e) {
  // When something gets clicked,
  var target = closest(e.target, 'a');
  // Check if it’s a link to a page on this domain.
  if (!target || target.host !== location.host) return;
  
  // If it is, stop the browser from loading the next page,
  e.preventDefault();
  // get the path of the page,
  var path = getPath(target);
  // and load it ourselves.
  loadPage(path).then(function (json) {
    // Then, once the page is loaded,
    // insert the rendered HTML in the correct place
    document.querySelector('main').outerHTML = json.html;
    // and change the file name in the header.
    document.querySelector('.js-file-name').textContent = json.context.fileName;

    // Finally, update the title bar and address bar,
    history.pushState(null, json.title, target.href);
    // and tell listeners about the page load.
    emitLoad(path, target);
  })
});

function getPath(l) {
  return l.pathname + l.search + l.hash;
}

function emitLoad(path, target) {
  var event = new Event('page:load');
  event.target = target;
  event.data = {
    path: path,
  };
  document.dispatchEvent(event);
}

function loadPage(path) {
  // If the path is in the cache, load it immediately.
  if (path in cache) {
    NProgress.done(true); // show bar anyway
    return Promise.resolve(cache[path]);
  }

  // Otherwise, fetch it from the server,
  NProgress.start();
  var promise = fetch('/api/fetch?path=' + encodeURIComponent(path)).then(function (res) {
    // then convert it to JSON.
    return res.json();
  })
  // Once we have the JSON,
  promise.then(function (json) {
    // cache it!
    cache[path] = json;
    NProgress.done();
    return json
  }).catch(function (error) {
    // If something went wrong, log it in the console.
    console.warn(error);
    NProgress.done();
  });
  return promise;

}

// When the page loads,
document.addEventListener('page:load', function () {
  // set the correct link as active.
  document.querySelector('a.active').classList.remove('active');
  document.querySelector('a[href="' + window.location.pathname + '"]').classList.add('active');
})


// Emit an initial load event when the page is ready
window.addEventListener('load', function () {
  emitLoad(getPath(location), document)
})


if (!Element.prototype.matches && Element.prototype.matchesSelector) {
  Element.prototype.matches = Element.prototype.matchesSelector;
}

function closest(element, selector) {
  if (!element) return null;
  if (element.matches(selector)) {
    return element;
  }
  return closest(element.parentElement, selector);
}