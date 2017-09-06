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
 * Output copyright symbol and current year
 * @return str e.g. '© 2017'
 */
function lj_copyright_message() {
	$year = date('Y');
	return ' &copy; Copyright ' . $year;
}
add_shortcode('copyright', 'lj_copyright_message');

function the_company_address() {
	// $name = get_company_info('name');
	$str_address = get_company_info('street');
	$locality = get_company_info('locality');
	$region = get_company_info('region');
	$postcode = get_company_info('postcode');

	echo '<div itemscope itemtype="http://schema.org/PostalAddress">';
	echo '<p class="address">';
	// echo '<span itemprop="name">' . $name . '</span> ';
	echo '<span itemprop="streetAddress">' . $str_address . '</span> ';
	echo '<span itemprop="addressLocality">' . $locality . '</span> ';
	echo '<span itemprop="addressRegion">' . $region . '</span> ';
	echo '<span itemprop="postalCode">' . $postcode . '</span>';
	echo '</p>';
	echo '</div>';
}

function the_company_email_link() {
	$email_address = get_company_info('email');

	echo '<a href="' . antispambot("mailto:$email_address") . '">' . antispambot($email_address) . '</a>';
}

function the_company_tel_link() {
	$tel_no = get_company_info('tel');
	$tel_no_link = str_replace(' ', '', $tel_no);

	echo '<a href="tel:' . $tel_no_link . '">' . $tel_no . '</a>';
}

function get_company_gm_link($type) {

	if($type === 'directions') {
		$url = 'https://www.google.com/maps/dir/Current+Location/';
	} elseif ($type === 'place') {
		$url = 'https://www.google.com/maps/place/';
	}

	$str_address = get_company_info('street');
	$locality = get_company_info('locality');
	$region = get_company_info('region');
	$postcode = get_company_info('postcode');

	$address = $str_address . ' ' . $locality . ' ' . $region . ' ' . $postcode;
	$link = str_replace(' ', '+', $address);

	return $url . $link;
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