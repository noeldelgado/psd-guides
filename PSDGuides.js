(function ( window, undefined ) {

    "use strict";

    window.PSDGuides = PSDGuides;

    var doc  = window.document,
        body = document.getElementsByTagName("body")[0],
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
        },
        UI  = {},
        f   = {};

    function PSDGuides ( options ) {
        f.extend( options );
        PSDGuides.prototype.init();
    }

    PSDGuides.prototype = {
        init : function () {
            this.drawUI();
            this.bindEvents();
            this.draw();
        },

        bindEvents : function () {
            f.addEvent( window, "resize", function () {
                if ( settings.show ) {
                    PSDGuides.prototype.draw();
                }
            });

            f.addEvent( UI.toggler, "click", function () {
                if ( UI.wrapper.style.display != "none" ) {
                    UI.wrapper.style.display = "none";
                    UI.toggler.innerHTML = UI.toggler.textOff;
                    settings.show = false;
                } else {
                    UI.wrapper.style.display = "";
                    UI.toggler.innerHTML = UI.toggler.textOn;
                    settings.show = true;
                    PSDGuides.prototype.draw();
                }
                return false;
            });
        },

        drawUI : function () {
            var style;
            UI.toggler              = document.createElement("span");
            style                   = UI.toggler.style;
            UI.toggler.textOn       = "Hide PSDGuides.js";
            UI.toggler.textOff      = "Show PSDGuides.js";
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
            this.clearAll();

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
            var frag            =  document.createDocumentFragment(),
                newDocHeight    = 0,
                style           = null;

            UI.yContainer   = document.createElement("div");
            style           = UI.yContainer.style;
            style.position  = "absolute";
            style.top       = 0;
            style.height    = "100%";
            style.width     = "100%";

            settings.yGuides.map(function ( t, i ) {
                var e;

                if ( typeof t === "string" && t.indexOf("*") !== -1 ) {
                    var elems   = t.replace(/[()\s]/g, "").split(/[,*]/g),
                        j       = 0,
                        l       = elems.length - 1,
                        m       = elems[elems.length - 1];

                    for ( ; j < m; j += 1 ) {
                        elems.map(function ( tt, index ) {
                            if ( index === l ) {
                                return;
                            }

                            e = document.createElement('div');
                            e.style.height          = (tt - 1) + "px";
                            e.style.borderBottom    = "1px dotted " + settings.lineColor;
                            newDocHeight            += parseInt( tt, 10 );
                            frag.appendChild( e );
                        });
                    }
                } else {
                    e                       = document.createElement('div');
                    e.style.height          = (t - 1) + "px";
                    e.style.borderBottom    = "1px dotted " + settings.lineColor;
                    newDocHeight            += parseInt( t, 10 );
                    frag.appendChild( e );
                }
            });

            newDocHeight            = Math.max( body.clientHeight, newDocHeight );
            UI.wrapper.style.height = newDocHeight;
            UI.yContainer.appendChild( frag );
            UI.wrapper.appendChild( UI.yContainer );
        },

        drawXLines : function () {
            var frag            = document.createDocumentFragment(),
                siteWidth       = settings.canvasWidth > 0 ? settings.canvasWidth : f.getWidth(),
                availableWidth  = 0,
                alignTo         = f.getOrientation( siteWidth ),
                style           = null;

            UI.xContainer       = document.createElement("div");
            style               = UI.xContainer.style;
            style.position      = "fixed";
            style.top           = 0;
            style.height        = "100%";
            style.width         = (siteWidth - 2) + "px";
            style.marginLeft    = alignTo + "px";
            style.borderLeft    = "1px dotted " + settings.lineColor;
            style.borderRight   = "1px dotted " + settings.lineColor;

            while ( availableWidth < siteWidth ) {
                settings.xGuides.map(function ( t, i ) {
                    var e;

                    if ( typeof t === "string" && t.indexOf("*") !== -1 ) {
                        var elems   = t.replace(/[()\s]/g, "").split(/[,*]/g),
                            j       = 0,
                            l       = elems.length - 1,
                            m       = elems[elems.length - 1];

                        for ( ; j < m; j += 1 ) {
                            elems.map(function ( tt, index ) {
                                if ( index === l ) {
                                    return;
                                }

                                e = document.createElement('div');
                                e.style.left = availableWidth + "px";

                                availableWidth += parseInt( tt, 10 );

                                if ( availableWidth < siteWidth ) {
                                    e.style.position    = "absolute";
                                    e.style.height      = "100%";
                                    e.style.width       = parseInt( tt, 10 ) - 1 + "px";
                                    e.style.borderRight = "1px dotted " + settings.lineColor;
                                    frag.appendChild( e );
                                }
                            });
                        }
                    } else {
                        e = document.createElement('div');
                        e.style.left = availableWidth + "px";

                        availableWidth += parseInt( t, 10 );

                        if (availableWidth < siteWidth) {
                            e.style.position    = "absolute";
                            e.style.height      = "100%";
                            e.style.width       = parseInt( t, 10 ) - 1 + "px";
                            e.style.borderRight = "1px dotted " + settings.lineColor;
                            frag.appendChild( e );
                        }
                    }
                });
            }
            UI.xContainer.appendChild( frag );
            UI.wrapper.appendChild( UI.xContainer );
        },

        clearAll : function () {
            var e = document.getElementById('psGuidesWrapper');
            if ( e !== null ) {
                body.removeChild( e );
            }
        }
    };

    f.extend = function ( options ) {
        var i;
        for ( i in options ) {
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
    };

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
        return Object.getOwnPropertyNames( obj ).length === 0 ? true : false;
    };

    f.getOrientation = function ( siteWidth ) {
        var x;
        switch ( settings.orientation ) {
            case "center":
                x = Math.floor( (f.getWidth() - siteWidth) / 2 );
                break;
            case "left":
                x = 0;
                break;
            case "right":
                x = Math.floor( f.getWidth() - siteWidth );
                break;
            default:
                x = Math.floor( (f.getWidth() - siteWidth) / 2 );
        }
        return x;
    };
})( window );
