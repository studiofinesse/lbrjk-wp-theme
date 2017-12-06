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