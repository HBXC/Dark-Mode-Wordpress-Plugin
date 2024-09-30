document.addEventListener('DOMContentLoaded', function () {
    // Delay execution to ensure the body's dark-mode class is applied
    setTimeout(function () {    
        // Get the images by class names
        const image1 = document.querySelector('.wp-image-306'); // Light mode image
        const image2 = document.querySelector('.wp-image-305'); // Dark mode image

        // Add more images as needed
        // const newLightImage = document.querySelector('.wp-image-new-light'); // New light mode image
        // const newDarkImage = document.querySelector('.wp-image-new-dark'); // New dark mode image

        // Function to toggle images based on dark mode
        function toggleImages() {
            if (document.body.classList.contains('dark-mode')) {
                // Switch to the dark mode images
                if (image1) {
                    image1.classList.add('hidden'); // Hide light mode image
                    image1.classList.remove('visible');
                }
                if (image2) {
                    image2.classList.remove('hidden'); // Show dark mode image
                    image2.classList.add('visible');
                }

                // Uncomment and add more image handling if needed
                // if (newLightImage) {
                //     newLightImage.classList.add('hidden'); // Hide new light mode image
                //     newLightImage.classList.remove('visible');
                // }
                // if (newDarkImage) {
                //     newDarkImage.classList.remove('hidden'); // Show new dark mode image
                //     newDarkImage.classList.add('visible');
                // }
            } else {
                // Switch to the light mode images
                if (image1) {
                    image1.classList.remove('hidden'); // Show light mode image
                    image1.classList.add('visible');
                }
                if (image2) {
                    image2.classList.add('hidden'); // Hide dark mode image
                    image2.classList.remove('visible');
                }

                // Uncomment and add more image handling if needed
                // if (newLightImage) {
                //     newLightImage.classList.remove('hidden'); // Show new light mode image
                //     newLightImage.classList.add('visible');
                // }
                // if (newDarkImage) {
                //     newDarkImage.classList.add('hidden'); // Hide new dark mode image
                //     newDarkImage.classList.remove('visible');
                // }
            }
        }

        // Apply initial visibility based on the body's current state
        function applyInitialVisibility() {
            if (document.body.classList.contains('dark-mode')) {
                if (image2) {
                    image2.classList.add('initial-visible'); // Ensure dark mode image is visible initially
                    image2.classList.remove('hidden');
                    image2.classList.add('visible');
                }
                // if (newDarkImage) {
                //     newDarkImage.classList.add('initial-visible'); // Ensure new dark mode image is visible initially
                //     newDarkImage.classList.remove('hidden');
                //     newDarkImage.classList.add('visible');
                // }
            } else {
                if (image1) {
                    image1.classList.add('initial-visible'); // Ensure light mode image is visible initially
                    image1.classList.remove('hidden');
                    image1.classList.add('visible');
                }
                // if (newLightImage) {
                //     newLightImage.classList.add('initial-visible'); // Ensure new light mode image is visible initially
                //     newLightImage.classList.remove('hidden');
                //     newLightImage.classList.add('visible');
                // }
            }
        }

        // Initial visibility application
        applyInitialVisibility();

        // Initial toggle based on the current mode
        toggleImages();

        // Listen for changes to the body class
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === 'class') {
                    toggleImages();
                }
            });
        });

        observer.observe(document.body, { attributes: true });

    }, 50); // Delay by 50ms to ensure body class is applied
});
