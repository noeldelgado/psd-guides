## PSDGuides.js

PSDGuides.js is a simple script to draw photoshop-like guides.

Can be usefull during slicing phase to accomplish pixel-perfect web layouts.

### Usage

```js
PSDGuides({
    canvasWidth : 1000,
    xGuides     : [20, "355 * 2", 250, 20],
    yGuides     : [50, "100 * 2", "250 * 2", "50 * 3"]
});
```

Tip: While defining your guides if you have similar values that needs to be repeated several times, like: `yGuides: [10, 10, 10, 10, 10, 20, 30, 20, 30, 20, 30]` you can use the `*` character followed by the number you want it to be repeated: `yGuides: ["10 * 5", "(20, 30) * 3"]`.

### Defaults

```js
show        : true, // Boolean : (true, false)
canvas      : document.getElementsByTagName("body")[0],
canvasWidth : 0, // Integer
orientation : "center", // String : ("center", "left", "right")
backColor   : "rgba(132, 170, 234, .25)", // Valid Color
lineColor   : "rgba(73, 141, 255, 1)", // Valid Color
xGuides     : {},
yGuides     : {},
zindex      : 9999
```

#### 960 Grid System

Applying 960 grid system

##### 12-column grid

```js
PSDGuides({
    canvasWidth : 960,
    xGuides     : [10, 60, 10]
});
```

##### 16-column grid

```js
PSDGuides({
    canvasWidth : 960,
    xGuides     : [10, 40, 10]
});
```

##### 24-column grid

```js
PSDGuides({
    canvasWidth : 960,
    xGuides     : [10, 20, 10]
});
