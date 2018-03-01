<?php
/**
 * Index template
 * ------------------------------ *
 * Template used for default archive display
 */
get_header();
?>

<?php if(have_posts()) : while(have_posts()) : the_post(); ?>
	<article class="post">
		<h2 class="post__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
	</article>
<?php endwhile; endif; ?>

<?php get_footer(); ?>