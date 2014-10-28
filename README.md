# Gardr Resize Plugin (Ext)

Gardr plugin to resize contents of an iframe (images, flash objects, other iframes) if they're exceeding iframe's size.

Requires [options plugin](https://github.com/Schibsted-Tech-Polska/gardr-plugin-host-options) bundled in host.

## Install

```
npm install gardr-plugin-ext-resize --save
```

## Bundle

In your ext bundle file:
```javascript
    var gardrExt = require('gardr-ext');
    var resize = require('gardr-plugin-ext-resize');

    gardrExt.plugin(resize);

    module.exports = gardrExt;
```

## Options (host)

```resizeInnerHorizontal``` - boolean, enables horizontal resizing of iframe content

```resizeInnerVertical``` - boolean, enables horizontal resizing of iframe content

## Example

```javascript
var gardr = gardrHost(...);
gardr.queue('ad', {
    resizeInnerHorizontal: true,
    resizeInnerVertical: true,
    ...
});
```
