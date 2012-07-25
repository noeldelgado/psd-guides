(function( window, undefined ) {
    
    'use strict';
    
    window.PSDGuides = PSDGuides;
    
    var document = window.document,
        body = document.getElementsByTagName('body')[0],
        PSDWrapper = null,
        HContainer = null,
        VContainer = null,
        _element = {},
        _options = {};
    
    function PSDGuides( elem, options ) {
        if ( !elem ) {
            console.error("element " + elem);
            return;
        }
        
        this.options = {};
        
        for ( var prop in PSDGuides.defaults ) {
            this.options[prop] = PSDGuides.defaults[prop];
        }
        
        for ( prop in options ) {
            this.options[prop] = options[prop];
        }
        
        _element = elem;
        _options = this.options;
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
            if (this.checkVariables() && _options.show) {
                this.bindEvents();
                this.drawWrapper();
            }
        },
        
        bindEvents : function () {
            window.addEventListener('resize', function () {
                !PSDGuides.prototype.isObjEmpty(_options.vGuides) ? PSDGuides.prototype.drawWrapper() : null;
            }, false);
        },
        
        isObjEmpty : function (obj) {
            return Object.getOwnPropertyNames(obj).length === 0 ? true : false
        },
        
        
        checkVariables : function () {
          return !this.isObjEmpty(_options.hGuides) || !this.isObjEmpty(_options.vGuides) || _options.siteWidth !== 0;
        },
        
        drawWrapper : function () {
            this.clearAll();
            PSDWrapper = document.createElement('div');
            PSDWrapper.style.position = 'absolute';
            PSDWrapper.style.top = 0;
            PSDWrapper.style.width = '100%';
            PSDWrapper.style.height = getDocumentHeight() + 'px';
            PSDWrapper.style.zIndex = _options.zindex;
            PSDWrapper.style.backgroundColor = _options.backColor;
            PSDWrapper.setAttribute('id', 'psGuidesWrapper');
            body.appendChild(PSDWrapper);
            
            !this.isObjEmpty(_options.hGuides) ? this.drawHorizontalLines() : null;
            !this.isObjEmpty(_options.vGuides) ? this.drawVerticalLines() : null;
        },
        
        drawHorizontalLines : function () {
            var totalLines = _options.hGuides.length,
                newDocHeight = 0;
            
            HContainer = document.createElement('div');
            HContainer.style.position = 'absolute';
            HContainer.style.top = 0;
            HContainer.style.zIndex = _options.zindex;
            HContainer.style.height = '100%';
            HContainer.style.width = '100%';
            HContainer.setAttribute('id', 'psGuidesHorizontals');
            PSDWrapper.appendChild(HContainer);
            
            for (var y = 0; y < totalLines; y += 1) {
                var e = document.createElement('div');
                e.style.height = _options.hGuides[y] + 'px';
                e.style.boxShadow = 'inset 0 -1px 0 ' + _options.lineColor;
                HContainer.appendChild(e);
                newDocHeight += parseInt(_options.hGuides[y]);
            }
            
            newDocHeight = Math.max(body.clientHeight, newDocHeight);
            PSDWrapper.style.height = newDocHeight;
        },
        
        drawVerticalLines : function (wrapper, canvas) {
            var siteWidth = _options.siteWidth > 0 ? _options.siteWidth : body.clientWidth,
                alignTo;
            
            switch ( _options.orientation ) {
                case 'center' :
                    alignTo = (body.clientWidth - siteWidth) / 2;
                    break;
                case 'left' :
                    alignTo = 0;
                    break;
                case 'right' :
                    alignTo = body.clientWidth - siteWidth;
                    break;
            };
            
            VContainer = document.createElement('div');
            VContainer.style.position = 'fixed';
            VContainer.style.top = 0;
            VContainer.style.zIndex = _options.zindex;
            VContainer.style.height = '100%';
            VContainer.style.width = siteWidth + 'px';
            VContainer.style.marginLeft = alignTo + 'px';
            VContainer.style.boxShadow = 'inset 1px 0 0 ' + _options.lineColor + ', 1px 0 0 ' + _options.lineColor;
            VContainer.setAttribute('id', 'psGuidesVerticals');
            PSDWrapper.appendChild(VContainer);
            
            if ( !this.isObjEmpty(_options.vGuides) ) {
                var availableWidth = 0,
                    totalLines = _options.vGuides.length;
                
                while ( availableWidth < siteWidth ) {
                    for (var y = 0; y < totalLines; y += 1) {
                        var e = document.createElement('div');
                        e.style.position = 'absolute';
                        e.style.width = availableWidth + parseInt(_options.vGuides[y]) + 'px';
                        e.style.height = '100%';
                        e.style.boxShadow = 'inset -1px 0 0 ' + _options.lineColor;
                        
                        availableWidth += parseInt(_options.vGuides[y]);
                        if ( availableWidth < siteWidth ) {
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