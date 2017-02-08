<?php

/**
 * Define ACF local save directory
 * @param  string $path The current path
 * @return string       The new path
 */
function acf_save_directory($path) {
	$path = get_stylesheet_directory() . '/app/acf/fields';
	return $path;
}
add_filter('acf/settings/save_json', 'acf_save_directory');

/**
 * Define ACF local load directory
 * @param  string $paths The current path
 * @return string        The new path
 */
function acf_load_directory($paths) {
	unset($paths[0]);
	$paths[] = get_stylesheet_directory() . '/app/acf/fields';
	return $paths;
}
add_filter('acf/settings/load_json', 'acf_load_directory');

/**
 * Register ACF options pages
 *  1 - Site Options
 */
if(function_exists('acf_add_options_page')) {
	acf_add_options_page(array(
		'page_title' => 'Site Options',
		'menu_title' => 'Site Options',
		'menu-slug'  => 'site-options',
		'capability' => 'edit_pages',
		'icon_url'   => 'dashicons-screenoptions',
		'position'   => 3
	));
}