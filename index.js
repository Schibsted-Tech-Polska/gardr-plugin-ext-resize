/* global gardr */

'use strict';

var resize = function(gardrPluginApi) {

    gardrPluginApi.on('banner:rendered', function() {
        var iframeWidth = window.innerWidth,
            iframeHeight = window.innerHeight;

        Array.prototype.slice.call(document.querySelectorAll('img, object, embed, iframe')).forEach(function(toResize) {
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
        });
    });

};

module.exports = resize;
