(function( window, undefined ) {
    
    'use strict';
    
    window.PSDGuides = PSDGuides;
    
    var document = window.document,
        body = document.getElementsByTagName('body')[0],
        PSDWrapper = null,
        HContainer = null,
        VContainer = null,
        Element = {},
        Options = {};
    
    function PSDGuides( elem, options ) {
        if (!elem) {
            console.error("element " + elem);
            return;
        }
        
        this.options = {};
        
        for (var prop in PSDGuides.defaults) {
            this.options[prop] = PSDGuides.defaults[prop];
        }
        
        for (prop in options) {
            this.options[prop] = options[prop];
        }
        
        Element = elem;
        Options = this.options;
        this.init();
    }
    
    PSDGuides.defaults = {
        show : true,
        backColor : 'rgba(132, 170, 234, .25)',
        lineColor : 'rgba(73, 141, 255, 1)',
        siteWidth : 0,
        orientation : 'center',
        hGuides : {},
        vGuides : {},
        zindex : 9999
    };
    
    PSDGuides.prototype = {
            
        init : function () {
            if ( this.checkVariables() && Options.show ) {
                this.bindEvents();
                this.drawWrapper();
            }
        },
        
        bindEvents : function () {
            window.addEventListener('resize', function () {
                !PSDGuides.prototype.isObjEmpty(Options.vGuides) ? PSDGuides.prototype.drawWrapper() : null;
            }, false);
        },
        
        isObjEmpty : function (obj) {
            return Object.getOwnPropertyNames(obj).length === 0 ? true : false
        },
        
        
        checkVariables : function () {
          return !this.isObjEmpty(Options.hGuides) || !this.isObjEmpty(Options.vGuides) || Options.siteWidth !== 0;
        },
        
        drawWrapper : function () {
            this.clearAll();
            PSDWrapper = document.createElement('div');
            PSDWrapper.style.cssText = 'position: absolute; top: 0; width: 100%; height: ' + getDocumentHeight() + 'px; z-index: ' + Options.zindex + '; background-color: ' + Options.backColor;
            PSDWrapper.setAttribute('id', 'psGuidesWrapper');
            body.appendChild(PSDWrapper);
            
            !this.isObjEmpty(Options.hGuides) ? this.drawHorizontalLines() : null;
            !this.isObjEmpty(Options.vGuides) ? this.drawVerticalLines() : null;
        },
        
        drawHorizontalLines : function () {
            var totalLines = Options.hGuides.length,
                newDocHeight = 0;
            
            HContainer = document.createElement('div');
            HContainer.style.cssText = 'position: absolute; top: 0; height: 100%; width: 100%;';
            HContainer.setAttribute('id', 'psGuidesHorizontals');
            PSDWrapper.appendChild(HContainer);
            
            for (var y = 0; y < totalLines; y += 1) {
                var e = document.createElement('div');
                e.style.height = Options.hGuides[y] + 'px';
                e.style.boxShadow = 'inset 0 -1px 0 ' + Options.lineColor;
                HContainer.appendChild(e);
                newDocHeight += parseInt(Options.hGuides[y]);
            }
            
            newDocHeight = Math.max(body.clientHeight, newDocHeight);
            PSDWrapper.style.height = newDocHeight;
        },
        
        drawVerticalLines : function (wrapper, canvas) {
            var siteWidth = Options.siteWidth > 0 ? Options.siteWidth : body.clientWidth,
                alignTo = 0;
            
            switch (Options.orientation) {
                case 'center' :
                    alignTo = Math.round((body.clientWidth - siteWidth) / 2);
                    break;
                case 'left' :
                    alignTo = 0;
                    break;
                case 'right' :
                    alignTo = Math.round(body.clientWidth - siteWidth);
                    break;
                default:
                    alignTo = Math.round((body.clientWidth - siteWidth) / 2);
            };
            
            VContainer = document.createElement('div');
            VContainer.style.cssText = 'position: fixed; top: 0; height: 100%; width: ' + siteWidth + 'px; margin-left: ' + alignTo + 'px';
            VContainer.style.boxShadow = 'inset 1px 0 0 ' + Options.lineColor + ', 1px 0 0 ' + Options.lineColor;
            VContainer.setAttribute('id', 'psGuidesVerticals');
            PSDWrapper.appendChild(VContainer);
            
            if (!this.isObjEmpty(Options.vGuides)) {
                var availableWidth = 0,
                    totalLines = Options.vGuides.length;
                
                while (availableWidth < siteWidth) {
                    for (var y = 0; y < totalLines; y += 1) {
                        var e = document.createElement('div');
                        e.style.cssText = 'position: absolute; height: 100%; width: ' + (availableWidth + parseInt(Options.vGuides[y])) + 'px;';
                        e.style.boxShadow = 'inset -1px 0 0 ' + Options.lineColor;
                        availableWidth += parseInt(Options.vGuides[y]);
                        
                        if (availableWidth < siteWidth) {
                            VContainer.appendChild(e);
                        } else {
                            return false;
                        }
                    }
                }
            }
        },
        
        clearAll : function () {
           var e = document.getElementById('psGuidesWrapper');
           e !== null ? body.removeChild(e) : null;
        }
        
    };
    
    function getDocumentHeight() {
        return Math.max(
            Math.max(body.scrollHeight, document.documentElement.scrollHeight),
            Math.max(body.offsetHeight, document.documentElement.offsetHeight),
            Math.max(body.clientHeight, document.documentElement.clientHeight)
        );
    }

})(window);