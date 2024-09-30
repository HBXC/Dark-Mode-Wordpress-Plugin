<?php
/*
Plugin Name: X Dark Mode Switch
Plugin URI: 
Description: A WordPress plugin to toggle dark mode with image switching.
Version: 1.2
Author: HBX
Author URI: 
License: 
License URI: 
*/

// Enqueue plugin scripts and styles
function x_dark_mode_switch_enqueue_scripts() {
    // Enqueue the main plugin CSS for styling
    wp_enqueue_style('x-dark-mode-switch-css', plugins_url('x-dark-mode-switch.css', __FILE__));
    
    // Enqueue the main plugin JavaScript (e.g., for handling dark mode toggle)
    wp_enqueue_script('x-dark-mode-switch-js', plugins_url('x-dark-mode-switch.js', __FILE__), array('jquery'), '1.0', true);
    
    // Enqueue the JavaScript file for toggling images based on dark mode
    wp_enqueue_script(
        'x-dark-mode-switch-image-toggle-js', // Handle for the new script
        plugins_url('x-dark-mode-switch-image-toggle.js', __FILE__), // Path to the JS file
        array('jquery'), // Dependencies (e.g., jQuery)
        '1.0', // Version number (optional)
        true // Load the script in the footer
    );
}
add_action('wp_enqueue_scripts', 'x_dark_mode_switch_enqueue_scripts');

// Add early JavaScript for setting the initial image visibility based on dark mode
function x_dark_mode_switch_early_js() {
    ?>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Get the images by class names
            const image1 = document.querySelector('.wp-image-306'); // Light mode image
            const image2 = document.querySelector('.wp-image-305'); // Dark mode image

            // Set initial visibility based on the current body class
            if (document.body.classList.contains('dark-mode')) {
                // Start with the dark mode image visible
                if (image2) image2.classList.add('initial-visible');
            } else {
                // Start with the light mode image visible
                if (image1) image1.classList.add('initial-visible');
            }
        });
    </script>
    <?php
}
add_action('wp_head', 'x_dark_mode_switch_early_js');

// Add a shortcode to display the dark mode toggle button
function x_dark_mode_switch_shortcode($atts) {
    ob_start(); // Start output buffering
    ?>
    <div class="x-dark-mode-switch">
        <button id="dark-mode-toggle">👁️</button>
    </div>
    <?php
    return ob_get_clean(); // Return the buffered content
}
add_shortcode('x_dark_mode_switch', 'x_dark_mode_switch_shortcode');

// Enqueue block editor assets (for the Gutenberg editor)
function x_dark_mode_switch_enqueue_block_assets() {
    // Enqueue block editor JavaScript
    wp_enqueue_script(
        'x-dark-mode-blocks',
        plugins_url('block.js', __FILE__), // Path to the block editor JavaScript file
        array('wp-blocks', 'wp-element', 'wp-i18n', 'wp-editor'), // Dependencies for block editor
        filemtime(plugin_dir_path(__FILE__) . 'block.js') // Cache busting
    );

    // Enqueue block editor styles
    wp_enqueue_style(
        'x-dark-mode-blocks-editor-style',
        plugins_url('editor.css', __FILE__), // Path to editor styles
        array('wp-edit-blocks') // Dependency
    );
}
add_action('enqueue_block_editor_assets', 'x_dark_mode_switch_enqueue_block_assets');
?>
