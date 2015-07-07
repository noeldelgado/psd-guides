(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * psdguides - Draw photoshop-like guides
 * @version v1.0.0
 * @link https://github.com/noeldelgado/psd-guides
 * @license MIT
 */
(function () {
    function PSDGuides(config) {
        this.config = {
            canvas : document.body,
            canvasWidth : 0,
            alignment : "center",
            backColor : "rgba(132, 170, 234, 0.25)",
            lineColor : "rgba(73, 141, 255, 1)",
            horizontalGuides : [],
            verticalGuides : [],
            zindex : 9999
        };
        this._ui = null;
        this._verticalGuides = null;
        this._horizontalGuides = null;
        this.__resizeHandler = null;
        this._reGroup = null;
        this._reSplit = null;
        this.active = null;

        Object.keys(config).forEach(function(propertyName) {
            this.config[propertyName] = config[propertyName];
        }, this);

        this._init();
   }

    PSDGuides.prototype._init = function _init() {
        this._ui = {};
        this.active = false;
        this._verticalGuides = [];
        this._horizontalGuides = [];
        this._reGroup = new RegExp("[()\\s]","g");
        this._reSplit = new RegExp("[,*]","g");

        this._ui.documentElement = window.document.documentElement;
        this._ui.body = window.document.body;
        this._ui.wrapper = document.createElement("div");
        this._ui.hContainer = document.createElement("div");
        this._ui.vContainer = document.createElement("div");

        this._setStyles(this._ui.wrapper, {
            display : "none",
            position : "absolute",
            top : 0,
            zIndex : this.config.zIndex,
            backgroundColor: this.config.backColor
        })._setStyles(this._ui.hContainer, {
            position : "absolute",
            top : 0,
            height : "100%",
            borderLeft : "1px dotted " + this.config.lineColor,
            borderRight : "1px dotted " + this.config.lineColor
        })._setStyles(this._ui.vContainer, {
            position : "absolute",
            top : 0,
            height : "100%",
            width : "100%"
        });

        this._ui.wrapper.className = "psd-guides-wrapper";
        this.config.canvas.appendChild(this._ui.wrapper);

        this._bindEvents();
        this._overrideCSS();
        this.addVerticalGuides(this.config.verticalGuides);
        this.addHorizontalGuides(this.config.horizontalGuides);
        this.update();

        return this;
    };

    PSDGuides.prototype._bindEvents = function _bindEvents() {
        this.__resizeHandler = this._resizeHandler.bind(this);
        window.addEventListener("resize", this.__resizeHandler, false);

        return this;
    };

    PSDGuides.prototype._resizeHandler = function _resizeHandler() {
        if (this.active) {
            this._hide();
            window.clearTimeout(this._resizeTimer);
            this._resizeTimer = window.setTimeout(function() {
                this.update().activate();
            }.bind(this), 250);
        }
    };

    /**
     * Add guides to the _verticalGuides Array holder.
     * @property addVerticalGuides <public> [Function]
     * @argument guides <required> [Array]
     * @return this [PSDGuides]
     */
    PSDGuides.prototype.addVerticalGuides = function addVerticalGuides(guides) {
        this._verticalGuides = this._verticalGuides.concat(this._getParsedGuides(guides));

        return this;
    };

    /**
     * Add guides to the _horizontalGuides Array holder.
     * @property addHorizontalGuides <public> [Function]
     * @argument guides <required> [Array]
     * @return this [PSDGuides]
     */
    PSDGuides.prototype.addHorizontalGuides = function addHorizontalGuides(guides) {
        this._horizontalGuides = this._horizontalGuides.concat(this._getParsedGuides(guides));

        return this;
    };

    /**
     * Check if the guides needs to be translated into Numbers.
     * parsed = this._getParsedGuides([100, "200 * 4"], 100);
     * => [100, 200, 200, 200, 200, 100]
     * @property _getParsedGuides <private> [Function]
     * @argument guides <required> [Array]
     * @return _parsedGuides [Array]
     */
    PSDGuides.prototype._getParsedGuides = function _getParsedGuides(guides) {
        var _parsedGuides = [];

        guides.map(function (guide) {
            if ((typeof guide === "string") && (guide.indexOf("*") !== -1)) {
                var values, times, length, i, j;

                values = guide.replace(this._reGroup, "").split(this._reSplit);
                times = values.pop();
                length = values.length;

                for (i = 0; i < times; i++) {
                    for (j = 0; j < length; j++) {
                        _parsedGuides.push(~~values[j]);
                    }
                }

                return;
            }

            _parsedGuides.push(~~guide);
        }, this);

        return _parsedGuides;
    };

    /**
     * Create the vertical guides DOMElements and append them to its parent.
     * @property _createVerticalLines <private> [Function]
     * @return this [PSDGuides]
     */
    PSDGuides.prototype._createVerticalLines = function _createVerticalLines() {
        var fragment, newDocHeight;

        fragment = document.createDocumentFragment();
        newDocHeight = 0;

        this.getVerticalGuides().map(function (guide) {
            this._appendLine(fragment, {
                height : guide + "px",
                borderBottom : "1px dotted " + this.config.lineColor
            });

            newDocHeight += guide;
        }, this);

        newDocHeight = Math.max(this._ui.body.clientHeight, newDocHeight);

        this._ui.wrapper.style.height = newDocHeight;
        this._ui.vContainer.appendChild(fragment);
        this._ui.wrapper.appendChild(this._ui.vContainer);

        return this;
    };

    /**
     * Create the horizontal guides DOMElements and append them to its parent.
     * @prototype _createHorizontalLines <private> [Object]
     * @return this [PSDGuides]
     */
    PSDGuides.prototype._createHorizontalLines = function _createHorizontalLines() {
        var fragment, siteWidth, coveredWidth;

        fragment = document.createDocumentFragment();
        siteWidth = this.config.canvasWidth;
        coveredWidth = 0;

        this._setStyles(this._ui.hContainer, {
            width : (siteWidth) + "px",
            marginLeft : this._getAligment(siteWidth) + "px"
        }).getHorizontalGuides().map(function (guide) {
            this._appendLine(fragment, {
                position : "absolute",
                left : coveredWidth + "px",
                width : guide + "px",
                height : "100%",
                borderRight : "1px dotted " + this.config.lineColor
            });

            coveredWidth += guide;
        }, this);

        this._ui.hContainer.appendChild(fragment);
        this._ui.wrapper.appendChild(this._ui.hContainer);

        return this;
    };

    /**
     * Remove the guide elements from the DOM.
     * @property _removeLines <private> [Function]
     * @return this [PSDGuides]
     */
    PSDGuides.prototype._removeLines = function _removeLines() {
        while (this._ui.hContainer.firstChild) {
            this._ui.hContainer.removeChild(this._ui.hContainer.firstChild);
        }

        while (this._ui.vContainer.firstChild) {
            this._ui.vContainer.removeChild(this._ui.vContainer.firstChild);
        }

        return this;
    };

    /**
     * Crate a new Element (line) and append it to the parentElement passed as
     * the first argument. It will also add the styles passed as second param.
     * @property _appendLine <private> [Function]
     * @argument parent <required> [DOMElement] the element to append the line.
     * @argument styles <optional> [Object] the styles to be added to the line.
     * @return this [PSDGuides]
     */
    PSDGuides.prototype._appendLine = function _appendLine(parent, styles) {
        var line = document.createElement("div");

        this._setStyles(line, styles);
        parent.appendChild(line);

        return this;
    };

    /**
     * Return the max available width or height of the document.
     * @property _getMaxSize <private> [Function]
     * @argument prop <required> [String] "Width|Height"
     * @return Math.max(...) [Number]
     */
    PSDGuides.prototype._getMaxSize = function _getMaxSize(prop) {
        var scroll, offset, client;

        scroll = Math.max(this._ui.body['scroll' + prop], this._ui.documentElement['scroll' + prop]);
        offset = Math.max(this._ui.body['offset' + prop], this._ui.documentElement['offset' + prop]);
        client = Math.max(this._ui.body['client' + prop], this._ui.documentElement['client' + prop]);

        return Math.max(scroll, offset, client);
    };

    /**
     * Return the number of pixels for psd-guides container to be aligned.
     * @property _getAligment <private> [Function]
     * @return [Number]
     */
    PSDGuides.prototype._getAligment = function _getAligment(siteWidth) {
        if (this.config.alignment === "left") {
            return 0;
        }

        if (this.config.alignment === "right") {
            return Math.floor(this._getMaxSize("Width") - siteWidth);
        }

        return Math.floor((this._getMaxSize("Width") - siteWidth) / 2);
    };

    /**
     * Utility method for adding styles to elements.
     * @property _setStyles <private> [Function]
     * @argument element <required> [DOMElement]
     * @argument hash <required> [Object]
     * @return this [PSDGuides]
     */
    PSDGuides.prototype._setStyles = function _setStyles(element, hash) {
        Object.keys(hash).forEach(function(propertyName) {
            element.style[propertyName] = hash[propertyName];
        });

        return this;
    };

    /**
     * CSS override utility.
     * @property _overrideCSS <private> [Function]
     * @return this [PSDGuides]
     */
    PSDGuides.prototype._overrideCSS = function _overrideCSS() {
        var css, head, style;

        css = ".psd-guides-wrapper * {-webkit-box-sizing: border-box !important; box-sizing: border-box !important;}";
        head = document.getElementsByTagName("head")[0];
        style = document.createElement("style");

        style.type = "text/css";

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);

        return this;
    };

    PSDGuides.prototype._hide = function _hide() {
        this._ui.wrapper.style.display = "none";
    };

    /**
     * Return the current saved horizontal guides.
     * @property getHorizontalGuides <public> [Function]
     * @return this._horizontalGuides [Array]
     */
    PSDGuides.prototype.getHorizontalGuides = function getHorizontalGuides() {
        return this._horizontalGuides;
    };

    /**
     * Return the current saved vertical guides.
     * @property getVerticalGuides <public> [Function]
     * @return this._verticalGuides [Array]
     */
    PSDGuides.prototype.getVerticalGuides = function getVerticalGuides() {
        return this._verticalGuides;
    };

    /**
     * Clear the horizontal guides array reference.
     * @property removeHorizontalGuides <public> [Function]
     * @return this [PSDGuides]
     */
    PSDGuides.prototype.removeHorizontalGuides = function removeHorizontalGuides() {
        this._horizontalGuides = [];

        return this;
    };

    /**
     * Clear the vertical guides array reference.
     * @property removeVerticalGuides <public> [Function]
     * @return this [PSDGuides]
     */
    PSDGuides.prototype.removeVerticalGuides = function removeVerticalGuides() {
        this._verticalGuides = [];

        return this;
    };

    /**
     * Clear both horizontal and vertical array references.
     * @property removeGuides <public> [Function]
     * @return this [PSDGuides]
     */
    PSDGuides.prototype.removeGuides = function removeGuides() {
        this.removeHorizontalGuides().removeVerticalGuides();

        return this;
    };

    /**
     * Update the width and height of psd-guides container,
     * remove and create the guides using the guides array references.
     * @property update <public> [Function]
     * @return this [PSDGuides]
     */
    PSDGuides.prototype.update = function update() {
        this._setStyles(this._ui.wrapper, {
            width : this._getMaxSize("Width") + "px",
            height : this._getMaxSize("Height") + "px"
        })._removeLines()._createVerticalLines()._createHorizontalLines();

        return this;
    };

    /**
     * Display the guides.
     * @property activate <public> [Function]
     * @return this [PSDGuides]
     */
    PSDGuides.prototype.activate = function activate() {
        this.active = true;
        this.update();
        this._ui.wrapper.style.display = "";

        return this;
    };

    /**
     * Hide the guides.
     * @property deactivate <public> [Function]
     * @return this [PSDGuides]
     */
    PSDGuides.prototype.deactivate = function deactivate() {
        this.active = false;
        this._hide();

        return this;
    };

    /**
     * Clean all references to other objects and remove DOMElements.
     * @property destroy <public> [Function]
     * @return null
     */
    PSDGuides.prototype.destroy = function destroy () {
        this._removeLines();
        this._ui.wrapper.removeChild(this._ui.vContainer);
        this._ui.wrapper.removeChild(this._ui.hContainer);
        this.config.canvas.removeChild(this._ui.wrapper);
        window.removeEventListener("resize", this.__resizeHandler, false);

        Object.keys(this).forEach(function(propertyName) {
            delete this[propertyName];
        }, this);

        return null;

    };

    if (typeof exports === 'object') module.exports = PSDGuides;
    else window.PSDGuides = PSDGuides;
})();

},{}],2:[function(require,module,exports){
window.onload = function () {
    var guides = require('../');
    var button = document.querySelector('button');

    button.addEventListener('click', function() {
        if (psd.active) {
            return psd.deactivate();
        }

        return psd.activate();
    });

    window.psd = new guides({
        canvasWidth : 1000,
        horizontalGuides : [20],
        verticalGuides : [50, "100 * 2", "250 * 2"],
        zIndex : 0
    });

    psd.addHorizontalGuides(["355 * 2", 250]);
    psd.addVerticalGuides(["50 * 3"]);
    psd.activate();

    console.log('horizontals', psd.getHorizontalGuides());
    console.log('verticals', psd.getVerticalGuides());
};

},{"../":1}]},{},[2]);
