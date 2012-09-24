(function (window, undefined) {

    "use strict";

    window.PSDGuides = PSDGuides;

    var doc     = window.document,
        body    = document.getElementsByTagName("body")[0],
        UI      = {},
        f       = {},
        settings = {
            show        : true,
            canvas      : body,
            canvasWidth : 0,
            orientation : "center",
            backColor   : "rgba(132, 170, 234, 0.25)",
            lineColor   : "rgba(73, 141, 255, 1)",
            xGuides     : {},
            yGuides     : {},
            zindex      : 9999
        };

    function PSDGuides (options) {
        f.extend(options);
        PSDGuides.prototype.init();
    }

    PSDGuides.prototype = {
        init : function () {
            this.UI();
            this.bindEvents();
            this.draw();
        },

        bindEvents : function () {
            f.addEvent( window, "resize", function () {
                if ( settings.show ) {
                    PSDGuides.prototype.draw();
                }
            });
            f.addEvent( UI.toggler, "click", function (e) {
                if ( UI.wrapper.style.display != "none" ) {
                    UI.wrapper.style.display = "none";
                    settings.show = false;
                    UI.toggler.innerHTML = UI.toggler.textOff;
                } else {
                    UI.wrapper.style.display = "";
                    settings.show = true;
                    UI.toggler.innerHTML = UI.toggler.textOn;
                    PSDGuides.prototype.draw();
                }
                return false;
            });
        },

        UI : function () {
            UI.toggler = document.createElement("a");
            UI.toggler.textOn   = "Hide PSDGuides.js";
            UI.toggler.textOff  = "Show PSDGuides.js";
            var style = UI.toggler.style;
            style.position          = "fixed";
            style.right             = "10px";
            style.top               = "10px";
            style.padding           = "5px 10px";
            style.border            = "1px solid #000";
            style.backgroundColor   = "rgba(0, 0, 0, 0.7)";
            style.borderRadius      = "3px";
            style.color             = "#f0f0f0";
            style.fontFamily        = "'Helvetica Neue', Helvetica, Arial, sans-serif";
            style.fontSize          = "11px";
            style.fontWeight        = "bold";
            style.zIndex            = settings.zindex + 1;
            style.cursor            = "pointer";
            UI.toggler.innerHTML    = settings.show ? UI.toggler.textOn : UI.toggler.textOff;
            UI.toggler.setAttribute("id", "psdguide-ui");
            body.appendChild( UI.toggler );
        },

        draw : function () {
            var style;
            this.clear();
            UI.wrapper              = document.createElement("div");
            style                   = UI.wrapper.style;
            style.position          = "absolute";
            style.top               = 0;
            style.width             = "100%";
            style.height            = f.getHeight() + "px";
            style.zIndex            = settings.zindex;
            style.backgroundColor   = settings.backColor;
            UI.wrapper.setAttribute("id", "psGuidesWrapper");
            body.appendChild( UI.wrapper );

            if ( !settings.show ) {
                style.display = "none";
            }

            if ( !f.isObjEmpty( settings.yGuides ) ) {
                this.drawYLines();
            }

            if ( !f.isObjEmpty( settings.xGuides ) ) {
                this.drawXLines();
            }
        },

        drawYLines : function () {
            var newDocHeight    = 0,
                style           = null;

            UI.yContainer   = document.createElement("div");
            style           = UI.yContainer.style;
            style.position  = "absolute";
            style.top       = 0;
            style.height    = "100%";
            style.width     = "100%";
            UI.wrapper.appendChild( UI.yContainer );

            settings.yGuides.map(function ( v, y ) {
                var e                   = document.createElement('div');
                e.style.height          = (settings.yGuides[y] - 1) + "px";
                e.style.borderBottom    = "1px dotted " + settings.lineColor;
                UI.yContainer.appendChild( e );
                newDocHeight += parseInt( settings.yGuides[y], 10 );
            });

            newDocHeight            = Math.max( body.clientHeight, newDocHeight );
            UI.wrapper.style.height = newDocHeight;
        },

        drawXLines : function () {
            var siteWidth       = settings.canvasWidth > 0 ? settings.canvasWidth : f.getWidth(),
                availableWidth  = 0,
                alignTo         = f.getOrientation( siteWidth ),
                style           = null,
                e;

            UI.xContainer       = document.createElement("div");
            style               = UI.xContainer.style;
            style.position      = "fixed";
            style.top           = 0;
            style.height        = "100%";
            style.width         = (siteWidth - 2) + "px";
            style.marginLeft    = alignTo + "px";
            style.borderLeft    = "1px dotted " + settings.lineColor;
            style.borderRight   = "1px dotted " + settings.lineColor;
            UI.wrapper.appendChild( UI.xContainer );

            if (!f.isObjEmpty(settings.xGuides)) {
                while (availableWidth < siteWidth) {
                    settings.xGuides.map(function (v, i) {
                        var x = settings.xGuides[i],
                            m;
                        if ( typeof x === "string" ) {
                            if ( x.indexOf("*") !== -1 ) {
                                var j = 0;
                                x = x.replace(/[()\s]/g, "").split(/[,*]/g);
                                m = x[x.length - 1];
                                for ( ; j < m; j += 1 ) {
                                    x.map(function (v, index) {
                                        if ( index === (x.length - 1) ) {
                                            return;
                                        }
                                        e = document.createElement('div');
                                        e.style.position    = "absolute";
                                        e.style.left        = availableWidth + "px";
                                        e.style.height      = "100%";
                                        e.style.width       = parseInt( x[index], 10 ) - 1 + "px";
                                        e.style.borderRight = "1px dotted " + settings.lineColor;
                                        availableWidth += parseInt( x[index], 10 );
                                        (availableWidth < siteWidth) ? UI.xContainer.appendChild( e ) : null;
                                    });
                                };
                            }
                        } else {
                            e = document.createElement('div');
                            e.style.position    = "absolute";
                            e.style.left        = availableWidth + "px";
                            e.style.height      = "100%";
                            e.style.width       = parseInt(settings.xGuides[i], 10) - 1 + "px";
                            e.style.borderRight = "1px dotted " + settings.lineColor;
                            availableWidth += parseInt(settings.xGuides[i], 10);
                            (availableWidth < siteWidth) ? UI.xContainer.appendChild(e) : null;
                        }
                    });
                }
            }
        },

        clear : function () {
            var e = document.getElementById('psGuidesWrapper');
            if ( e !== null ) {
                body.removeChild( e );
            }
        }
    };

    f.extend = function ( options ) {
        var i;
        for (i in options) {
            if ( options.hasOwnProperty(i) ) {
                settings[i] = options[i];
            }
        }
    };

    f.addEvent = function ( obj, type, fn ) {
        if ( obj.addEventListener ) {
            obj.addEventListener( type, fn, false );
        } else if ( obj.attachEvent ) {
            obj[ 'e' + type + fn ] = fn;
            obj[ type + fn ] = function() {
                obj[ 'e' + type + fn ]( window.event );
            };
            obj.attachEvent( "on" + type, obj[ type + fn ] );
        }
    }

    f.getHeight = function () {
        return  Math.max(
            Math.max( body.scrollHeight, doc.documentElement.scrollHeight ),
            Math.max( body.offsetHeight, doc.documentElement.offsetHeight ),
            Math.max( body.clientHeight, doc.documentElement.clientHeight )
        );
    };

    f.getWidth = function () {
         return  Math.max(
            Math.max( body.scrollWidth, doc.documentElement.scrollWidth ),
            Math.max( body.offsetWidth, doc.documentElement.offsetWidth ),
            Math.max( body.clientWidth, doc.documentElement.clientWidth )
        );
    };

    f.isObjEmpty = function ( obj ) {
        return Object.getOwnPropertyNames( obj ).length === 0 ? true : false
    };

    f.getOrientation = function ( siteWidth ) {
        switch ( settings.orientation ) {
            case "center":
                return Math.floor( (f.getWidth() - siteWidth) / 2 );
                break;
            case "left":
                return 0;
                break;
            case "right":
                return Math.floor( f.getWidth() - siteWidth );
                break;
            default:
                return Math.floor( (f.getWidth() - siteWidth) / 2 );
        };
    };
})(window);