/*
---
name: FitImage
description: fix in place and fitto screen any background image
license: MIT-style license.
authors:
  - Anton Suprun
requires:
  - Core/Array
  - Core/Class.Extras
  - Core/DOMReady
  - Core/Element.Dimensions
provides: [FitImage]
...
*/


var FitImage = new Class({

    Implements: [Events, Options],

    options: {
        'class': 'resize-background',
        'center': true,
        'minWidth': 1024,
        'minHeight': 768,
        'primary': 'auto',
        'injectElement': null,
        'injectPosition': 'top'
    },

    initialize: function(image, options){
        options = options || {};
        options.primary = options.primary && ['width', 'height', 'auto'].contains(options.primary)
			? options.primary
			: 'auto';
        this.setOptions(options);
        this.image = new Element('img', {
            'src': image,
            'class': this.options['class']
        }).addEvent('load', this.inject.bind(this));
        // In case browser does not support load event for images
        window.addEvent('load', this.inject.bind(this));
        window.addEvent('domready', this.resize.bind(this));
        window.addEvent('resize', this.resize.bind(this));
    },

    inject: function(){
        if (this.injected) return this;
        if (!this.options.injectElement) this.options.injectElement = document.body;
        this.image.inject(this.options.injectElement, this.options.injectPosition);
        this.injected = true;
        // *** If image fails to resize, return launching resize on inject call even after inject becomes true
        this.resize();
        return this;
    },

    resize: function(){
        var size = window.getSize(),
            rate = size.x / size.y,
            styles = {};

        if (!this.size || this.size.x == 0){
            // *** Detect image size
            this.size = this.image.getSize();
            if (this.size.x == 0) return this; // Not loaded yet
            this.rate = this.size.x / this.size.y;
        }

        // *** Set first dimension size
        if (this.options.primary == 'width' || (this.options.primary == 'auto' && this.rate < rate)){
            styles.width  = size.x;
            styles.height = null;
        } else if (this.options.primary == 'height' || (this.options.primary == 'auto' && this.rate > rate)){
            styles.width  = null;
            styles.height = size.y;
        } else {
            // *** Perfect fit!
            styles.width  = size.x;
            styles.height = size.y;
        }

        // *** Min width && height
        if (styles.width  !== null && this.options.minWidth  > styles.width)  styles.width  = this.options.minWidth;
        if (styles.height !== null && this.options.minHeight > styles.height) styles.height = this.options.minHeight;

        // *** Calculate second dimension size
        if (styles.width  === null) styles.width  = Math.round(styles.height * this.size.x / this.size.y);
        if (styles.height === null) styles.height = Math.round(styles.width  * this.size.y / this.size.x);

        // *** Position in the center of the screen
        if (this.options.center){
            // *** Horizontal
            if (styles.width > size.x)      styles.left = 0 - Math.round((styles.width - size.x) / 2);
            else if (styles.width < size.x) styles.left = Math.round((size.x - styles.width) / 2);
            else styles.left = 0;

            // *** Vertical
            if (styles.height > size.y)      styles.top = 0 - Math.round((styles.height - size.y) / 2);
            else if (styles.height < size.y) styles.top = Math.round((size.y - styles.height) / 2);
            else styles.top = 0;
        }

        this.image.setStyles(styles);
        return this;
    },

    toElement: function(){
        return this.image;
    }
	
});