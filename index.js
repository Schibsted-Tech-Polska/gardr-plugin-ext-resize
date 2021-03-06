/* global gardr */

'use strict';

var resize = function(gardrPluginApi) {

    var tryResize = function() {
        var iframeWidth = window.innerWidth,
            iframeHeight = window.innerHeight,

            resizeOne = function(toResize) {
                if(gardr.params.options && gardr.params.options.resizeInnerHorizontal) {
                    if(toResize.getBoundingClientRect().width > iframeWidth) {
                        toResize.style.maxWidth = '100%';
                    }
                }
                if(gardr.params.options && gardr.params.options.resizeInnerVertical) {
                    if(toResize.getBoundingClientRect().height > iframeHeight) {
                        toResize.style.maxHeight = iframeHeight + 'px';
                        window.addEventListener('resize', function() {
                            toResize.style.maxHeight = window.innerHeight + 'px';
                        });
                    }
                }
            };

        Array.prototype.slice.call(document.querySelectorAll('img, object, embed, iframe')).forEach(function(toResize) {
            if(typeof toResize.complete === 'boolean' && toResize.complete === false) {
                toResize.addEventListener('load', function() {
                    resizeOne(toResize);
                });
                toResize.addEventListener('error', function() {
                    resizeOne(toResize);
                });
            }
            else {
                resizeOne(toResize);
            }
        });
    };

    gardrPluginApi.on('banner:rendered', function() {
        if(gardr.params.options && gardr.params.options.resizeInnerCheckDelay) {
            setTimeout(tryResize, gardr.params.options.resizeInnerCheckDelay);
        }
        else {
            tryResize();
        }
    });

};

module.exports = resize;
