// @see core_post_process_route_change().

/**
 * Given variables from a dg.theme_link() call, this will set aside the href and target as data attributes and remove
 * their originals so they both can be used later in the onclick handler that we declare below.
 * @param variables
 */
dg_iab.init = function(variables) {
  var attrs = variables._attributes;

  // Give the link a unique id if it doesn't have one, that way we can load its options later in the onclick handler.
  if (!attrs.id) { attrs.id = 'iab-' + dg.salt(); }

  // Set aside href, and delete original.
  attrs['data-iab-url'] = attrs.href;
  //attrs.href = null;
  delete attrs.href;

  // Set aside the target and delete the original. Default the target to _self, unless one was provided.
  attrs['data-iab-target'] = '_self';
  if (attrs.target) {
    attrs['data-iab-target'] = attrs.target;
    delete attrs.target;
  }

  // Append our onclick handler up the onclick handler.
  if (!attrs.onclick) { attrs.onclick = ''; }
  attrs.onclick += 'dg_iab._onclick(this);';

  // Save the InAppBrowser config.
  dg_iab.save(attrs.id, variables._inAppBrowser);
};

/**
 * Saves an InAppBrowser configuration.
 * @param id {String}
 * @param options {Object}
 * @param ref Optional, the result of a cordova.InAppBrowser.open() call.
 */
dg_iab.save = function(id, options, ref) {
  dg._iab[id] = {
    options: options,
    ref: ref
  };
};

/**
 * Loads an InAppBrowser configuration.
 * @param id
 * @returns {null}
 */
dg_iab.load = function(id) {
  return dg._iab[id] ? dg._iab[id] : null;
};

/**
 * Handles clicks on InAppBrowser links from dg.theme_link().
 * @param anchor {Element} The HTML element from the DOM.
 */
dg_iab._onclick = function(anchor) {

  // Grab the anchor's id.
  var id = anchor.getAttribute('id');

  // Load dg's InAppBrowser config.
  var iab = dg_iab.load(id);

  // Set up default options.
  var options = "location=yes";

  // Process any custom options.
  if (iab.options) {
    if (typeof iab.options === 'string') { options = iab.options; }
    else if (dg.isObject(iab.options)) {
      var customOptions = iab.options;
      options = [];
      for (var option in customOptions) {
        if (!customOptions.hasOwnProperty(option)) { continue; }
        options.push(option + '=' + customOptions[option]);
      }
      options = options.join(',');
    }
  }
  //console.log('options', options);

  // Open the in app browser.
  var ref = cordova.InAppBrowser.open(
    anchor.getAttribute('data-iab-url'),
    anchor.getAttribute('data-iab-target'),
    options
  );

  // Save the updated InAppBrowser config.
  dg_iab.save(id, iab.options, ref);

};
