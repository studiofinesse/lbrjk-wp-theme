<?php

/**
 * Enqueue all necessary scripts and stylesheets
 */
function enqueue_scripts() {
	// Scripts
	wp_enqueue_script( 'vendor', JS . '/vendor.min.js', ['jquery'], null, true );
	wp_enqueue_script( 'functions', JS . '/functions.min.js', ['vendor'], null, true );
	// Stylesheets
	wp_enqueue_style( 'main', STYLES . '/main.min.css', '', null, false );
}
add_action( 'wp_enqueue_scripts', 'enqueue_scripts', 11 );

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