### PSDGuides.js

Simple script to draw photoshop-like guides. Intended to help obtaining pixel-perfect layouts.
No JavaScript library dependencies.

#### Usage

    var psd = new PSDGuides(document.body, {
        siteWidth : 1000,
        vGuides   : [20, 355, 355, 250, 20], // Vertical Guides
        hGuides   : [50, 100, 100, 250, 250, 50, 50, 50] // Horizontal Guides
    });

#### Defaults Options

    show: true, // (true, false)
    backColor: 'rgba(132, 170, 234, .25)',
    lineColor: 'rgba(73, 141, 255, 1)',
    siteWidth: 0,
    orientation: 'center', //("center", "left", "right")
    hGuides: {},
    vGuides: {},
    zindex: 9999