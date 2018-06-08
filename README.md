# dg_iab

Adds cordova's InAppBrowser capabilities to compiled DrupalGap apps.

https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/

## settings.js

This only works for compiled apps:

```
dg.settings.mode = 'cordova';
```

And you must have the plugin installed:

```
cordova plugin add cordova-plugin-inappbrowser
```

## Usage

Open a simple link in using the InAppBrowser:

```
var html = dg.l(dg.t('Hello World'), 'https://drupalgap.org', { _inAppBrowser: true });
```

Open a link with InAppBrowser `options`:

```
var html = dg.l(dg.t('Hello World'), 'https://drupalgap.org', {
    _inAppBrowser: {
      toolbarcolor: '#ff0000',
      hideurlbar: 'yes'
    }
});
```

For a complete list of `options`, see:

https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/
