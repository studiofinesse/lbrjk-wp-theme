<?php

/**
 * Include file from /inc directory
 * @param  str $path File name/path
 * @return str       Full path to included file
 */
function get_partial($path) {
	$theme_root = get_stylesheet_directory();
	$file = $theme_root . '/inc/' . $path . '.php';

	include $file;
}

/**
 * Get various info from ACF options page
 * @param  str $type Info to retrieve
 * @return mixed     The field, mainly text fields
 */
function company_info($type) {
	$type = 'company_' . $type;
	return get_field($type, 'option');
}