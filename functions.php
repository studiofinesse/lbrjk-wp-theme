<?php

// Define constants
define('THEME', get_stylesheet_directory_uri());
define('THEME_PATH', realpath(__DIR__));
define('IMG', THEME . '/dist/img');
define('STYLES', THEME . '/dist/css');
define('JS', THEME . '/dist/js');

// ACF
include_once('app/acf/acf-config.php');

// Content
include_once('app/content/post-types.php');
include_once('app/content/posts.php');

// Include library items
include_once('app/config.php');
include_once('app/helpers.php');
include_once('app/icons.php');
include_once('app/scripts.php');
include_once('app/social.php');
