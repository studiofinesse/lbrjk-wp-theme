<?php

if( ! defined('ABSPATH' ) ) exit;

/**
 * Enqueue all necessary scripts and stylesheets
 */
function enqueue_scripts() {
	// Scripts
	wp_enqueue_script( 'functions', JS . '/functions.js', ['jquery'], null, true );
	// Stylesheets
	wp_enqueue_style( 'main', STYLES . '/main.css', '', null, false );
	wp_dequeue_style( 'wp-block-library' ); // remove Gutenberg CSS
}
add_action( 'wp_enqueue_scripts', 'enqueue_scripts', 11 );

function dequeue_jquery_migrate( $scripts ) {
    if ( ! is_admin() && ! empty( $scripts->registered['jquery'] ) ) {
        $scripts->registered['jquery']->deps = array_diff(
            $scripts->registered['jquery']->deps,
            [ 'jquery-migrate' ]
        );
    }
}
add_action( 'wp_default_scripts', 'dequeue_jquery_migrate' );

/**
 * Disables the wp-embed script from running on every page :/
 * Ability to list array of allowed post types
 */
function disable_embed_script() {
	// Determine which post types we do want the script to run on
	$post_types = array( 'post' );
	if( ! is_singular( $post_types) ) wp_dequeue_script( 'wp-embed' );
}
add_action( 'wp_footer', 'disable_embed_script' );