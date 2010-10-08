FitImage
===========

FitImage allows you to have a background image stretched proportionally to full
screen width and height. It also remains fixed while the user scrolls the page.
Like on [thesixtyone](http://thesixtyone.com/).

How to use
----------

Using FitImage is as simple as it gets:

    #JS
    new FitImage('/background.jpg');

Also note, that this plugin does not include any style properties except those
that are dynamically generated, so you will have to add some styles to your
stylesheets:

    #CSS
    img.resize-background {
        position: fixed;
        z-index: 1;
    }

Also, you want to create a wrapper for your content and set its z-index to keep
it above the image:

    #CSS
    div.global-wrapper {
        position: relative;
        z-index: 2;
    }

Configuration
-------------

The following configuration options are available:

* `class`: image element class name(s)
* `center`: should the image be centered or not. Defaults to `true`.
* `minWidth`: minimum image width. If the screen width is less than the minimum width, image size will not be reduced. Defaults to `1024`.
* `minHeight`: minimum image height. Behaves identical to `minWidth`. Defaults to `768`.
* `primary`: defines which dimension should perfectly fit the screen. Either `width`, `height` or `auto`. The `auto` setting makes sure the image completely covers the screen. Defaults to `auto`.
* `injectElement`: element to be passed to the inject method. Defaults to `document.body`.
* `injectPosition`: position to be passed to the inject method. Defaults to `top`.

Image resizing operations always keep the image proportions intact.

Examples
--------

A background image aligned on the left side and fixed to fit screen height:

    #JS
    new FitImage('/background.jpg', {
        'center': false,
        'primary': 'height'
    });

And styles:

    #CSS
    img.resize-background {
        position: fixed;
        z-index: 1;
        top: 0;
        right: 0;
    }
    .wrapper-global {
        min-height: 100%;
        position: relative;
        z-index: 2;
    }
