( function( blocks, element, blockEditor, components, i18n ) {
    var el = element.createElement;
    var __ = i18n.__;
    var MediaUpload = blockEditor.MediaUpload;
    var InspectorControls = blockEditor.InspectorControls;
    var PanelBody = components.PanelBody;
    var RangeControl = components.RangeControl;
    var SelectControl = components.SelectControl;
    var ResizableBox = components.ResizableBox;
    var withSelect = wp.data.withSelect;

    // Register the Dark/Light Image Container Block
    blocks.registerBlockType( 'x-dark-mode/image-container', {
        title: __('Dark/Light Image Container', 'x-dark-mode'),
        icon: 'format-gallery',
        category: 'common',
        attributes: {
            lightImageURL: { type: 'string', default: '' }, // Light mode image URL
            darkImageURL: { type: 'string', default: '' },  // Dark mode image URL
            alignment: { type: 'string', default: 'center' }, // Alignment (center by default)
            containerWidth: { type: 'number', default: 300 }, // Container width
            containerHeight: { type: 'number', default: 200 }, // Container height
            marginTop: { type: 'number', default: 0 }, // Margins for the block
            marginRight: { type: 'number', default: 0 },
            marginBottom: { type: 'number', default: 0 },
            marginLeft: { type: 'number', default: 0 },
            imageSize: { type: 'string', default: 'full' }, // Image size options (full, large, medium, small)
            imageFit: { type: 'string', default: 'contain' }, // Image fit options ('contain' or 'fill')
        },
        // `withSelect` allows us to retrieve editor settings, such as available image sizes
        edit: withSelect( function( select ) {
            return {
                imageSizes: select( 'core/editor' ).getEditorSettings().imageSizes,
            };
        })( function( props ) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            // Image selection handlers for light and dark mode images
            function onSelectImage( media ) {
                setAttributes({ lightImageURL: media.url });
            }
            function onSelectDarkImage( media ) {
                setAttributes({ darkImageURL: media.url });
            }

            return el(
                'div',
                { 
                    className: `x-dark-mode-image-container align${attributes.alignment}`,
                    style: { 
                        marginTop: `${attributes.marginTop}px`,
                        marginRight: `${attributes.marginRight}px`,
                        marginBottom: `${attributes.marginBottom}px`,
                        marginLeft: `${attributes.marginLeft}px`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative' // Ensure images are overlaid on top of each other
                    }
                },
                // Sidebar Controls for margins, image size, and fit
                el(InspectorControls, {},
                    el(PanelBody, { title: __('Image Settings', 'x-dark-mode'), initialOpen: true },
                        el(RangeControl, {
                            label: __('Top Margin (px)', 'x-dark-mode'),
                            value: attributes.marginTop,
                            onChange: function( newMargin ) {
                                setAttributes({ marginTop: newMargin });
                            },
                            min: 0,
                            max: 100
                        }),
                        el(RangeControl, {
                            label: __('Right Margin (px)', 'x-dark-mode'),
                            value: attributes.marginRight,
                            onChange: function( newMargin ) {
                                setAttributes({ marginRight: newMargin });
                            },
                            min: 0,
                            max: 100
                        }),
                        el(RangeControl, {
                            label: __('Bottom Margin (px)', 'x-dark-mode'),
                            value: attributes.marginBottom,
                            onChange: function( newMargin ) {
                                setAttributes({ marginBottom: newMargin });
                            },
                            min: 0,
                            max: 100
                        }),
                        el(RangeControl, {
                            label: __('Left Margin (px)', 'x-dark-mode'),
                            value: attributes.marginLeft,
                            onChange: function( newMargin ) {
                                setAttributes({ marginLeft: newMargin });
                            },
                            min: 0,
                            max: 100
                        }),
                        el(SelectControl, {
                            label: __('Image Size', 'x-dark-mode'),
                            value: attributes.imageSize,
                            options: [
                                { label: __('Full', 'x-dark-mode'), value: 'full' },
                                { label: __('Large', 'x-dark-mode'), value: 'large' },
                                { label: __('Medium', 'x-dark-mode'), value: 'medium' },
                                { label: __('Small', 'x-dark-mode'), value: 'small' }
                            ],
                            onChange: function( newSize ) {
                                setAttributes({ imageSize: newSize });
                            }
                        }),
                        el(SelectControl, {
                            label: __('Image Fit', 'x-dark-mode'),
                            value: attributes.imageFit,
                            options: [
                                { label: __('Contain', 'x-dark-mode'), value: 'contain' },
                                { label: __('Fill', 'x-dark-mode'), value: 'fill' }
                            ],
                            onChange: function( newFit ) {
                                setAttributes({ imageFit: newFit });
                            }
                        })
                    ),
                    // Image upload controls for light and dark mode images
                    el(PanelBody, { title: __('Image Uploads', 'x-dark-mode'), initialOpen: true },
                        el('p', {}, __('Light Mode Image:', 'x-dark-mode')),
                        el(MediaUpload, {
                            onSelect: onSelectImage,
                            allowedTypes: 'image',
                            value: attributes.lightImageURL,
                            render: function( obj ) {
                                return el(
                                    'button',
                                    {
                                        className: 'button button-large',
                                        onClick: obj.open
                                    },
                                    attributes.lightImageURL ? 
                                    el('img', { src: attributes.lightImageURL, style: { width: '100%' } }) : 
                                    __('Upload Light Mode Image', 'x-dark-mode')
                                );
                            }
                        }),
                        el('p', {}, __('Dark Mode Image:', 'x-dark-mode')),
                        el(MediaUpload, {
                            onSelect: onSelectDarkImage,
                            allowedTypes: 'image',
                            value: attributes.darkImageURL,
                            render: function( obj ) {
                                return el(
                                    'button',
                                    {
                                        className: 'button button-large',
                                        onClick: obj.open
                                    },
                                    attributes.darkImageURL ? 
                                    el('img', { src: attributes.darkImageURL, style: { width: '100%' } }) : 
                                    __('Upload Dark Mode Image', 'x-dark-mode')
                                );
                            }
                        })
                    )
                ),
                // Resizable container for the image block
                el(ResizableBox, {
                    size: {
                        width: attributes.containerWidth,
                        height: attributes.containerHeight
                    },
                    minWidth: 100,
                    minHeight: 100,
                    maxWidth: 800,
                    maxHeight: 600,
                    onResizeStop: (event, direction, elt, delta) => {
                        setAttributes({
                            containerWidth: parseInt(attributes.containerWidth + delta.width, 10),
                            containerHeight: parseInt(attributes.containerHeight + delta.height, 10)
                        });
                    },
                    enable: {
                        top: true,
                        right: true,
                        bottom: true,
                        left: true,
                        topRight: true,
                        bottomRight: true,
                        bottomLeft: true,
                        topLeft: true
                    },
                    style: {
                        position: 'relative'
                    }
                },
                // Light and Dark mode images, overlaid in the container
                el(
                    'div',
                    { 
                        className: 'x-dark-mode-image-container-content',
                        style: { 
                            width: '100%',
                            height: '100%',
                            textAlign: attributes.alignment,
                            position: 'relative'
                        }
                    },
                    attributes.lightImageURL && el('img', {
                        src: attributes.lightImageURL,
                        className: `x-dark-mode-light-image size-${attributes.imageSize}`,
                        style: {
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: attributes.imageFit,
                            position: 'absolute', // Ensure overlay
                            top: 0,
                            left: 0,
                            zIndex: 1 // Light image appears on top
                        }
                    }),
                    attributes.darkImageURL && el('img', {
                        src: attributes.darkImageURL,
                        className: `x-dark-mode-dark-image size-${attributes.imageSize}`,
                        style: {
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: attributes.imageFit,
                            position: 'absolute', // Ensure overlay
                            top: 0,
                            left: 0,
                            zIndex: 0 // Dark image appears behind
                        }
                    })
                ))
            );
        }),
        save: function( props ) {
            var attributes = props.attributes;

            return el(
                'div',
                { 
                    className: `x-dark-mode-image-container align${attributes.alignment}`,
                    style: { 
                        width: `${attributes.containerWidth}px`,
                        height: `${attributes.containerHeight}px`,
                        marginTop: `${attributes.marginTop}px`,
                        marginRight: `${attributes.marginRight}px`,
                        marginBottom: `${attributes.marginBottom}px`,
                        marginLeft: `${attributes.marginLeft}px`,
                        position: 'relative',
                        overflow: 'hidden'
                    }
                },
                // Save the light and dark mode images, ensuring the correct layout on the frontend
                attributes.lightImageURL && el('img', {
                    src: attributes.lightImageURL,
                    className: `x-dark-mode-light-image size-${attributes.imageSize}`,
                    style: {
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: attributes.imageFit,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1
                    }
                }),
                attributes.darkImageURL && el('img', {
                    src: attributes.darkImageURL,
                    className: `x-dark-mode-dark-image size-${attributes.imageSize}`,
                    style: {
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: attributes.imageFit,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 0
                    }
                })
            );
        }
    });
} )( window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components, window.wp.i18n );
