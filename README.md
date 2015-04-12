# psd-guides

[![npm-image](https://img.shields.io/npm/v/psd-guides.svg?style=flat-square)](https://www.npmjs.com/package/psd-guides)
![bower-image](https://img.shields.io/bower/v/psd-guides.svg?style=flat-square)

http://noeldelgado.github.io/psd-guides/

psd-guides is a simple script to draw photoshop-like guides.

Can be useful during slicing phase to accomplish pixel-perfect web layouts.

## Installation
**NPM**

	npm install psd-guides --save
	
**BOWER**

	bower install psd-guides --save
	
## Usage
```javascript
new PSDGuides({
  canvasWidth : 1000,
  horizontalGuides : [20, "355 * 2", 250, 20],
  vericalGuides : [50, "100 * 2", "250 * 2", "50 * 3"]
}).activate();
```

**Tip:** While defining your guides, if you have similar values that needs to be repeated several times, instead of writing them all you can use the `*` character followed by the number you want it to be repeated, for instance: `vericalGuides : [10, 10, 10, 10, 10, 20, 30, 20, 30, 20, 30]` can be written as `verticalGuides : ["10 * 5", "(20, 30) * 3"]`

## Defaults
```javascript
{
  canvas : document.body,                 // [DOMElement]
  canvasWidth : 0,                        // [Integer] (pixels)
  alignment : "center",                   // [String] "center"|"left"|"right"
  backColor : "rgba(132, 170, 234, .25)", // [String] Any valid color format
  lineColor : "rgba(73, 141, 255, 1)",    // [String] Any valid color format
  horizontalGuides : [],                  // [Array]
  verticalGuides : [],                    // [Array]
  zindex : 9999                           // [Number]
}
```

## API

### activate
```javascript
/**
 * Display the guides.
 * @property activate <public> [Function]
 * @return this [PSDGuides]
 */

var psd = new PSDGuides({
	canvasWidth : 1000,
	horizontalGuides : [20, "355 * 2", 250],
	verticalGuides : [50, "100 * 2", "250 * 2", "50 * 3"]
});

psd.activate();
```

### deactivate
```javascript
/**
 * Hide the guides.
 * @property deactivate <public> [Function]
 * @return this [PSDGuides]
 */

psd.deactivate();
```

### update
```javascript
/**
 * Update the width and height of psd-guides container,
 * remove and create the guides using the guides array references.
 * @property update <public> [Function]
 * @return this [PSDGuides]
 */

psd.update();
```

### destroy
```javascript
/**
 * Clean all references to other objects and remove DOMElements.
 * @property destroy <public> [Function]
 * @return null
 */

psd.destroy();
// => null
```

### # Removing guides
When guides are removed, you need to call the `update` or `activate` method to reflect the changes.

### removeHorizontalGuides
```javascript
/**
 * Clear the horizontal guides array reference.
 * @property removeHorizontalGuides <public> [Function]
 * @return this [PSDGuides]
 */

psd.removeHorizontalGuides();
// console.log( psd.getHorizontalGuides() );
// => []
// console.log( psd.getVerticalGuides() );
// => [50, 100, 100, 250, 250, 50, 50, 50]
```

### removeVerticalGuides
```javascript
/**
 * Clear the vertical guides array reference.
 * @property removeVerticalGuides <public> [Function]
 * @return this [PSDGuides]
 */

psd.removeVerticalGuides();
// console.log( psd.getVerticalGuides() );
// => []
```

### removeGuides
```javascript
/**
 * Clear both horizontal and vertical array references.
 * @property removeGuides <public> [Function]
 * @return this [PSDGuides]
 */

psd.removeGuides().update();
```

### # Adding guides
When adding guides, you need to call the `update` or `activate` method after to reflect the changes.

### addHorizontalGuides
```javascript
/**
 * Add guides to the _horizontalGuides Array holder.
 * @property addHorizontalGuides <public> [Function]
 * @argument guides <required> [Array]
 * @return this [PSDGuides]
 */

psd.addHorizontalGuides([20, "355 * 2", 250]).update();
// console.log( psd.getHorizontalGuides() );
// => [20, 355, 355, 250]
```

### addVericalGuides
```javascript
/**
 * Add guides to the _verticalGuides Array holder.
 * @property addVerticalGuides <public> [Function]
 * @argument guides <required> [Array]
 * @return this [PSDGuides]
 */

psd.addVerticalGuides([50, "100 * 2", "250 * 2", "50 * 3"]).update();
// console.log( psd.getVerticalGuides() );
// => [50, 100, 100, 250, 250, 50, 50, 50]
```

### # Getting the guides
Get current saved guides.

### getHorizontalGuides
```javascript
/**
 * Return the current saved horizontal guides.
 * @property getHorizontalGuides <public> [Function]
 * @return this._horizontalGuides [Array]
 */

psd.getHorizontalGuides();
// => [20, 355, 355, 250]
```

### getVerticalGuides
```javascript
/**
 * Return the current saved vertical guides.
 * @property getVerticalGuides <public> [Function]
 * @return this._verticalGuides [Array]
 */

psd.getVerticalGuides();
// => [50, 100, 100, 250, 250, 50, 50, 50]
```

## Examples (960 Grid System)

Applying 960 grid system

### 12-column grid
```javascript
new PSDGuides({
    canvasWidth : 960,
    horizontalGuides : ["(10, 60, 10) * 12"]
}).activate()
```

### 16-column grid
```javascript
new PSDGuides({
    canvasWidth : 960,
    horizontalGuides : ["(10, 40, 10) * 16"]
}).activate();
```

### 24-column grid
```javascript
new PSDGuides({
    canvasWidth : 960,
    horizontalGuides : ["(10, 20, 10) * 24"]
}).activate()
```

There are more examples inside the `examples` folder.
