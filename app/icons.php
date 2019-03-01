<?php

if( ! defined('ABSPATH' ) ) exit;

/**
 * Include shortcut icons in head
 * @return str links to icons
 */
function site_shortcut_icons() {

	$dir = IMG . '/icons';
	$prefix = 'favicon';
	$path = $dir . '/' . $prefix;

	echo '<!-- Icons -->';
	echo '<link rel="shortcut icon" href="' . $path . '.ico">';
	echo '<link rel="icon" sizes="16x16 32x32 64x64" href="' . $path . '.ico">';
	echo '<link rel="icon" type="image/png" sizes="196x196" href="' . $path . '-192.png">';
	echo '<link rel="icon" type="image/png" sizes="160x160" href="' . $path . '-160.png">';
	echo '<link rel="icon" type="image/png" sizes="96x96" href="' . $path . '-96.png">';
	echo '<link rel="icon" type="image/png" sizes="64x64" href="' . $path . '-64.png">';
	echo '<link rel="icon" type="image/png" sizes="32x32" href="' . $path . '-32.png">';
	echo '<link rel="icon" type="image/png" sizes="16x16" href="' . $path . '-16.png">';
	echo '<link rel="apple-touch-icon" href="' . $path . '-57.png">';
	echo '<link rel="apple-touch-icon" sizes="114x114" href="' . $path . '-114.png">';
	echo '<link rel="apple-touch-icon" sizes="72x72" href="' . $path . '-72.png">';
	echo '<link rel="apple-touch-icon" sizes="144x144" href="' . $path . '-144.png">';
	echo '<link rel="apple-touch-icon" sizes="60x60" href="' . $path . '-60.png">';
	echo '<link rel="apple-touch-icon" sizes="120x120" href="' . $path . '-120.png">';
	echo '<link rel="apple-touch-icon" sizes="76x76" href="' . $path . '-76.png">';
	echo '<link rel="apple-touch-icon" sizes="152x152" href="' . $path . '-152.png">';
	echo '<link rel="apple-touch-icon" sizes="180x180" href="' . $path . '-180.png">';
}

add_action('wp_head', 'site_shortcut_icons');