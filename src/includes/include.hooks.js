/**
 * Implements hook_post_process_route_change().
 */
function dg_iab_post_process_route_change(route, _newPath, oldPath) {

  // Delete any leftover InAppBrowser options.
  dg._iab = {};

}
