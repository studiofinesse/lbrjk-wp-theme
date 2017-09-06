<?php

function lj_social_links() {
	$accounts = get_field('social_media_accounts', 'option');

	if($accounts) {
		echo '<ul class="social-icons">';
		foreach($accounts as $account) {
			echo '<li><a href="' . $account['social_media_account_url'] . '">' . $account['social_media_account']['label'] . '</a></li>';
		}
		echo '</ul>';
	}
}

function lj_social_icons($icon_prefix = 'fa') {
	$accounts = get_field('social_media_accounts', 'option');

	if($accounts) {
		echo '<div class="social-icons">';
		echo '<ul>';
		foreach($accounts as $account) {
			echo '<li>';
			echo '<a href="' . $account['social_media_account_url'] . '" title="' . $account['social_media_account']['label'] . '">';
			echo '<i class="' . $icon_prefix . ' ' . $icon_prefix . '-' . $account['social_media_account']['value'] . '"></i>';
			echo '</a>';
			echo '</li>';
		}
		echo '</ul>';
		echo '</div>';
	}
}