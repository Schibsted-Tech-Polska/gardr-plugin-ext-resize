/* global describe, beforeEach, it */

'use strict';

var resize = require('../index.js'),
    assert = require('assert'),
    PluginApi = require('gardr-core-plugin').PluginApi;

describe('resize', function() {

    var pluginApi,
        container;

    beforeEach(function() {
        pluginApi = new PluginApi();
        if(container && container.parentNode && container.parentNode) {
            container.parentNode.removeChild(container);
        }
        container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        document.body.style.overflow = 'hidden';

        window.gardr = {
            params: {
                options: {
                }
            }
        };

        window.innerWidth = 480;
        window.innerHeight = 480;
        document.body.style.margin = document.body.style.padding = '0px';

    });

    it('should expose public interface as a function', function() {
        assert.deepEqual(typeof resize, 'function', 'resize should be a function');
    });

    it('should resize images, flash objects and iframes horizontally when they exceed iframe size', function() {

        window.gardr.params.options.resizeInnerHorizontal = true;

        resize(pluginApi);

        var img = document.createElement('img');
        img.width = 600;
        img.height = 600;
        img.style.border = 'none';
        container.appendChild(img);

        var object = document.createElement('object');
        object.width = 600;
        object.height = 600;
        container.appendChild(object);

        var iframe = document.createElement('iframe');
        iframe.width = 600;
        iframe.height = 600;
        container.appendChild(iframe);

        pluginApi.trigger('banner:rendered', {
            width: 600,
            height: 1800
        });

        assert.deepEqual(img.style.maxWidth, '100%', 'image max width not set to 100%');
        assert.deepEqual(object.style.maxWidth, '100%', 'object max width not set to 100%');
        assert.deepEqual(iframe.style.maxWidth, '100%', 'iframe max width not set to 100%');
    });

    it('should resize images, flash objects and iframes vertically when they exceed iframe size', function() {

        window.gardr.params.options.resizeInnerVertical = true;

        resize(pluginApi);

        var img = document.createElement('img');
        img.width = 600;
        img.height = 600;
        img.style.border = 'none';
        container.appendChild(img);

        var object = document.createElement('object');
        object.width = 600;
        object.height = 600;
        container.appendChild(object);

        var iframe = document.createElement('iframe');
        iframe.width = 600;
        iframe.height = 600;
        container.appendChild(iframe);

        pluginApi.trigger('banner:rendered', {
            width: 600,
            height: 1800
        });

        assert.deepEqual(img.style.maxHeight, '480px', 'image max width not set to 480px');
        assert.deepEqual(object.style.maxHeight, '480px', 'object max width not set to 480px');
        assert.deepEqual(iframe.style.maxHeight, '480px', 'iframe max width not set to 480px');


    });

});
