<?php

if( ! defined('ABSPATH' ) ) exit;

/**
 * Reveal the hidden "Styles" dropdown in the advanced toolbar
 */
function lj_editor_buttons( $buttons ) {
	array_unshift( $buttons, 'styleselect' );
	return $buttons;
}
add_filter( 'mce_buttons_2', 'lj_editor_buttons' );

/**
 * Add custom style formats/classes to dropdown
 * e.g. Lead paragraphs and buttons
 */
function lj_mce_styles( $settings ) {

	$style_formats = array(
		array(
			'title' => 'Lead',
			'selector' => 'p',
			'classes' => 'lead'
		 ),
		array(
			'title' => 'Text Primary',
			'selector' => 'p',
			'classes' => 'text-primary'
		 ),
		array(
			'title' => 'Text Secondary',
			'selector' => 'p',
			'classes' => 'text-secondary'
		 ),
		array(
			'title' => 'Text Alt',
			'selector' => 'p',
			'classes' => 'text-alt'
		 ),
		array(
			'title' => 'Text White',
			'selector' => 'p',
			'classes' => 'text-white'
		 ),
		array(
			'title' => 'Button',
			'selector' => 'a',
			'classes' => 'btn'
		 ),
		array(
			'title' => 'Large Button',
			'selector' => 'a',
			'classes' => 'btn-large'
		 ),
		array(
			'title' => 'Button Primary',
			'selector' => 'a',
			'classes' => 'btn-primary'
		 ),
		array(
			'title' => 'Button Secondary',
			'selector' => 'a',
			'classes' => 'btn-secondary'
		 ),
		array(
			'title' => 'Button Alt',
			'selector' => 'a',
			'classes' => 'btn-alt'
		 ),
		array(
			'title' => 'Button Ghost',
			'selector' => 'a',
			'classes' => 'btn-ghost'
		 )
	 );

	$settings['style_formats'] = json_encode( $style_formats );

	return $settings;
}
add_filter( 'tiny_mce_before_init', 'lj_mce_styles' );