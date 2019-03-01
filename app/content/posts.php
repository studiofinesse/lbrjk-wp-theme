<?php

if( ! defined('ABSPATH' ) ) exit;

/**
 * Wrap video embeds found in the_content()
 * in a surrounding div element to style
 */
function responsive_embeds($content){
	return preg_replace('/<iframe (.*)>\s*/iU', '<div class="video-container"><iframe \1></iframe></div>', $content);
}
add_filter('the_content', 'responsive_embeds');