<?php

if( ! defined('ABSPATH' ) ) exit;

function wp_theme_config() {
	// Theme Support
	add_theme_support( 'title-tag' );// Title tag support
	add_theme_support( 'post-thumbnails' ); // Thumbnail support
	add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) ); // HTML5 support
	// add_theme_support( 'woocommerce' ); // Woocommerce

	// Register Nav Menus
	register_nav_menu( 'main-nav', 'Main Navigation' );
	register_nav_menu( 'footer-nav', 'Footer Navigation' );
	register_nav_menu( 'legal', 'Legal Links' );

	// Remove WP Head Info
	remove_action( 'wp_head', 'wp_generator' );
	remove_action( 'wp_head', 'wlwmanifest_link' );
	remove_action( 'wp_head', 'feed_links_extra', 3 );
	remove_action( 'wp_head', 'rsd_link' );
	remove_action( 'wp_head', 'index_rel_link' );
}
add_action( 'after_setup_theme', 'wp_theme_config' );