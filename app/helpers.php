<?php

if( ! defined('ABSPATH' ) ) exit;

/**
 * Grabs the part from the parts folder
 * @param string $name The name of the php file (minus the extension) to pull through.
 * @param array|null $vars Any variables to inject into the php file
 */
function lj_get_part( $name, $vars = null ) {
	if ( ! $__file = locate_template( "parts/$name.php" ) ) return;

	unset( $name );

	if ( is_array( $vars ) ) {
		extract( $vars, EXTR_SKIP );
	if ( array_key_exists( 'vars', $vars ) ) $vars = $vars['vars'];
		else unset( $vars );
	}

	include $__file;
}