<?php

if ( ! defined( 'ABSPATH') ) exit;

/**
 * Set default options when inserting media
 */
function lj_media_config() {
	// Set default options for when inserting images from media library
	update_option( 'image_default_align', 'none' ); // Set default alingment to none
	update_option( 'image_default_link_type', 'none' ); // Set default link type to none
	update_option( 'image_default_size', 'large' ); // Set default insert size to large

	// Update default image sizes to something more usable
	update_option( 'thumbnail_size_w', 300 ); // thumbnail width
	update_option( 'thumbnail_size_h', 300 ); // thumbnail height
	update_option( 'medium_size_w', 800 ); // medium width
	update_option( 'medium_size_h', 9999 ); // medium height
	update_option( 'large_size_w', 1200 ); // large width
	update_option( 'large_size_h', 9999 ); // large height

	// Add image sizes
	if(function_exists( 'add_image_size' )) {
		add_image_size( 'avatar', 150, 150, true );
		add_image_size( 'square-small', 400, 400, true );
		add_image_size( 'square-large', 800, 800, true );
		add_image_size( 'hero', 1200, 800, true );
	}

}

add_action( 'after_setup_theme', 'lj_media_config' );