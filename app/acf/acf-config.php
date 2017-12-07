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
		'menu_slug'  => 'lj-options',
		'icon_url'   => 'dashicons-screenoptions',
		'position'   => 3
	));

	acf_add_options_page([
		'page_title'  => 'Company',
		'menu_title'  => 'Company',
		'menu_slug'    => 'lj-options-company',
		'parent_slug' => 'lj-options',
		'autoload'    => true
	]);

	acf_add_options_page([
		'page_title'  => 'Tools',
		'menu_title'  => 'Tools',
		'menu_slug'    => 'lj-options-tools',
		'parent_slug' => 'lj-options',
		'autoload'    => true
	]);

	acf_add_options_page([
		'page_title'  => 'Footer',
		'menu_title'  => 'Footer',
		'menu_slug'    => 'lj-options-footer',
		'parent_slug' => 'lj-options',
		'autoload'    => true
	]);

}

// Run do_shortcode on all textarea values
function my_acf_format_value($value, $post_id, $field) {
	$value = do_shortcode($value);
	return $value;
}
add_filter('acf/format_value/type=textarea', 'my_acf_format_value', 10, 3);
add_filter('acf/format_value/type=text', 'my_acf_format_value', 10, 3);

/**
 * Update ACF Google Maps API key
 * @return string The new key
 */
function my_acf_init() {
	$key = get_field('site_google_maps_api_key', 'option');
	if(!$key) {
		return;
	} else {
		acf_update_setting('google_api_key', $key);
	}
}
add_action('acf/init', 'my_acf_init');