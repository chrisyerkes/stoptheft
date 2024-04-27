<?php 
/**
 * Implements hook_preprocess_HOOK() for all templates.
 */
function mytheme_preprocess(&$variables) {
  $variables['directory'] = base_path() . drupal_get_path('theme', 'mytheme');
}
