<?php

/**
 * Page template
 * ------------------------------ *
 * Template used for pages with default content/layout
 */

get_header();
the_post();

?>

<article class="post post--page">
	<?php the_content(); ?>
</article>

<?php

get_footer();