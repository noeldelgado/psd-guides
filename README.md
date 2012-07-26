## PSDGuides.js

Simple script to draw photoshop-like guides.

### Usage

```js
var psd = new PSDGuides(document.body, {
    siteWidth : 1000,
    vGuides   : [20, 355, 355, 250, 20], // Vertical Guides
    hGuides   : [50, 100, 100, 250, 250, 50, 50, 50] // Horizontal Guides
});
```
### Defaults Options

```js
show: true, // (true, false)
backColor: 'rgba(132, 170, 234, .25)',
lineColor: 'rgba(73, 141, 255, 1)',
siteWidth: 0,
orientation: 'center', //("center", "left", "right")
hGuides: {},
vGuides: {},
zindex: 9999
```

#### 960 Grid System

Applying a 960 grid system is easy as...

##### 12-Colums grid

```js
window.onload = function () {
    // 960 Grid System - 12 Columns
    var psdguides = new PSDGuides(document.body, {
        siteWidth : 960,
        vGuides   : [10, 60, 10]
    });
};
```

##### 16-Colums grid

```js
window.onload = function () {
    // 960 Grid System - 12 Columns
    var psdguides = new PSDGuides(document.body, {
        siteWidth : 960,
        vGuides   : [10, 40, 10]
    });
};
```