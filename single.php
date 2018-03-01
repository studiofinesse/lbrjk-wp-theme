<?php
/**
 * Single blog post
 * ------------------------------ *
 * Template used to display the content of a single blog post
 */
get_header();
the_post();
?>

<article class="post post--single">
	<?php the_title('<h1 class="post__title">', '</h1>'); ?>
	<?php the_content(); ?>
</article>

<?php get_footer(); ?>