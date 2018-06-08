/**
 * Implements hook_pre_process_route_change().
 */
function dg_iab_pre_process_route_change(newPath, oldPath) {

  // Delete any leftover InAppBrowser options.
  dg._iab = {};

}
