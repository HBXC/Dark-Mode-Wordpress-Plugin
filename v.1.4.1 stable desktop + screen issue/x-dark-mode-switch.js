// When the document has fully loaded, this function runs
document.addEventListener('DOMContentLoaded', function() {

    // This is the dark mode toggle button
    const toggleButton = document.getElementById('dark-mode-toggle');

    // Reference to the body element, where the dark-mode class is toggled
    const body = document.body;

    // Find all separators (with wp-block-separator class)
    const separators = document.querySelectorAll('.wp-block-separator'); // Targets the separator blocks

    // Find all buttons that will have their colors set
    const buttons = document.querySelectorAll('.wp-block-button a.wp-block-button__link'); // Targets all buttons

    // Find all social media icons
    const socialIcons = document.querySelectorAll('.wp-block-social-links a'); // Targets social media icons

    // Store original styles from the theme for reverting back to light mode
    let originalStyles = {};

    // Find elements that will switch color dynamically based on dark mode
    const elementsToChange = {
        background: document.querySelector('body'), // Background color of the body
        headers: document.querySelectorAll('h1, h2, h3, h4, h5, h6'), // Headers
        paragraphs: document.querySelectorAll('p'), // Paragraphs
        links: document.querySelectorAll('a'), // Links
        legends: document.querySelectorAll('.wp-element-caption'), // Legends
        separators: document.querySelectorAll('.wp-block-separator') // Separators
    };

    // --- True/False Controls --- //
    const includeImages = true;         // Controls whether images should switch
    const includeSocialIcons = true;    // Controls whether social media icons should switch

    // Function to store original theme colors (light mode)
    function storeOriginalStyles() {
        originalStyles.background = getComputedStyle(elementsToChange.background).backgroundColor;
        originalStyles.textColor = getComputedStyle(elementsToChange.background).color;

        originalStyles.headers = [];
        elementsToChange.headers.forEach(header => {
            originalStyles.headers.push(getComputedStyle(header).color);
        });

        originalStyles.paragraphs = [];
        elementsToChange.paragraphs.forEach(paragraph => {
            originalStyles.paragraphs.push(getComputedStyle(paragraph).color);
        });

        originalStyles.links = [];
        elementsToChange.links.forEach(link => {
            originalStyles.links.push(getComputedStyle(link).color);
        });

        originalStyles.legends = [];
        elementsToChange.legends.forEach(legend => {
            originalStyles.legends.push({
                color: getComputedStyle(legend).color
            });
        });

        // Store the original styles for the separators
        originalStyles.separators = [];
        elementsToChange.separators.forEach(separator => {
            originalStyles.separators.push({
                backgroundColor: getComputedStyle(separator).backgroundColor,
                color: getComputedStyle(separator).color
            });
        });

        // Store the original styles for the buttons
        originalStyles.buttons = [];
        buttons.forEach(button => {
            originalStyles.buttons.push({
                color: getComputedStyle(button).color,
                backgroundColor: getComputedStyle(button).backgroundColor
            });
        });
    }

    // Function to apply dark mode styles
    function applyDarkModeStyles() {
        body.style.backgroundColor = '#000000'; // Dark background
        body.style.color = '#ffffff'; // Light text

        elementsToChange.headers.forEach(header => {
            header.style.color = '#ffffff'; // White header text
        });

        elementsToChange.paragraphs.forEach(paragraph => {
            paragraph.style.color = '#dddddd'; // Lighter gray for paragraphs
        });

        elementsToChange.links.forEach(link => {
            link.style.color = '#F0E68C'; // Light Khaki for links
        });

        elementsToChange.legends.forEach(legend => {
            legend.style.color = '#b6b6b6'; // Lighter gray for legends
        });

        // Dark mode style for separators
        elementsToChange.separators.forEach(separator => {
            separator.style.backgroundColor = '#e3e3e3'; // White background for separators in dark mode
            separator.style.color = '#e3e3e3'; // Ensure text color is also white
        });

        // Dark mode style for buttons
        buttons.forEach(button => {
            button.style.color = '#070707'; // Button text color
            button.style.backgroundColor = '#f0e68c'; // Button background color
        });

        // Change text selection color for dark mode
        const style = document.createElement('style');
        style.id = 'dark-mode-selection-style';
        style.innerHTML = '::selection { background: #F0E68C; color: #080808; }';
        document.head.appendChild(style);
    }

    // Function to revert to the original light mode styles
    function revertToOriginalStyles() {
        body.style.backgroundColor = originalStyles.background; // Revert to original background
        body.style.color = originalStyles.textColor; // Revert to original text color

        elementsToChange.headers.forEach((header, index) => {
            header.style.color = originalStyles.headers[index]; // Revert header colors
        });

        elementsToChange.paragraphs.forEach((paragraph, index) => {
            paragraph.style.color = originalStyles.paragraphs[index]; // Revert paragraph colors
        });

        elementsToChange.links.forEach((link, index) => {
            link.style.color = originalStyles.links[index]; // Revert link colors
        });

        elementsToChange.legends.forEach((legend, index) => {
            legend.style.color = originalStyles.legends[index].color; // Revert to original legend color
        });

        // Revert to original separator styles
        elementsToChange.separators.forEach((separator, index) => {
            separator.style.backgroundColor = originalStyles.separators[index].backgroundColor;
            separator.style.color = originalStyles.separators[index].color;
        });

        // Revert to original button styles
        buttons.forEach((button, index) => {
            button.style.color = originalStyles.buttons[index].color;
            button.style.backgroundColor = originalStyles.buttons[index].backgroundColor;
        });

        // Revert text selection color for light mode
        const darkModeSelectionStyle = document.getElementById('dark-mode-selection-style');
        if (darkModeSelectionStyle) {
            darkModeSelectionStyle.remove();
        }
    }

 // Find all images (including the new images you might add)
    const image1 = document.querySelector('.wp-image-306'); // Light mode image
    const image2 = document.querySelector('.wp-image-305'); // Dark mode image
    // const newLightImage = document.querySelector('.wp-image-new-light'); // New light mode image
    // const newDarkImage = document.querySelector('.wp-image-new-dark'); // New dark mode image

    // Function to toggle images based on dark mode
    function toggleImages() {
        if (body.classList.contains('dark-mode')) {
            // Switch to the dark mode images
            if (image1) image1.classList.add('hidden'); // Hide light mode image
            if (image2) image2.classList.remove('hidden'); // Show dark mode image

            // Uncomment and add more image handling if needed
            // if (newLightImage) newLightImage.classList.add('hidden'); // Hide new light mode image
            // if (newDarkImage) newDarkImage.classList.remove('hidden'); // Show new dark mode image
        } else {
            // Switch to the light mode images
            if (image1) image1.classList.remove('hidden'); // Show light mode image
            if (image2) image2.classList.add('hidden'); // Hide dark mode image

            // Uncomment and add more image handling if needed
            // if (newLightImage) newLightImage.classList.remove('hidden'); // Show new light mode image
            // if (newDarkImage) newDarkImage.classList.add('hidden'); // Hide new dark mode image
        }
    }

    // Call toggleImages on initial load
    toggleImages();

    // Check if the dark mode toggle button exists
    if (toggleButton) {

        // When the toggle button is clicked, this code runs
        toggleButton.addEventListener('click', function() {
            
            // Toggle the 'dark-mode' class on the body
            const isDarkMode = body.classList.toggle('dark-mode');

            // Save the current state (dark mode on or off) in localStorage so it persists when the page reloads
            localStorage.setItem('dark-mode', isDarkMode);

            // Change the button emoji based on the current mode
            toggleButton.textContent = isDarkMode ? '👁️' : '👁️';

            if (isDarkMode) {
                storeOriginalStyles(); // Store original styles
                applyDarkModeStyles(); // Switch to dark mode
            } else {
                revertToOriginalStyles(); // Revert to light mode styles
            }

            // Switch images based on the dark mode state
            toggleImages();

            // Social media icons handling
            if (includeSocialIcons) {
                socialIcons.forEach(icon => {
                    // Check if the icon is the Twitter/X icon, change its color based on dark mode
                    if (icon.querySelector('[href*="twitter.com"], [href*="x.com"]')) {
                        icon.style.color = isDarkMode ? '#fff' : '#000'; // White in dark mode, black in light mode
                    } else {
                        icon.style.color = ''; // No change for other icons
                    }
                });
            }
        });

        // Apply dark mode on page load if stored in localStorage
        const isDarkModeStored = localStorage.getItem('dark-mode');
        if (isDarkModeStored === 'true') {
            body.classList.add('dark-mode');
            storeOriginalStyles();
            applyDarkModeStyles();
            toggleButton.textContent = '👁️';

            if (includeSocialIcons) {
                socialIcons.forEach(icon => {
                    // Check if the icon is the Twitter/X icon, apply the correct color for dark mode
                    if (icon.querySelector('[href*="twitter.com"], [href*="x.com"]')) {
                        icon.style.color = '#fff'; // Set Twitter icon to white in dark mode
                    } else {
                        icon.style.color = ''; // No change for other icons
                    }
                });
            }
        } else {
            toggleButton.textContent = '👁️';
        }
    } else {
        console.error('Dark mode toggle button not found.');
    }
});
