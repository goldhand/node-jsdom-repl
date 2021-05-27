const jsdom = require('jsdom');
function setGlobalWindow(
  globalObject,
  html = '<!DOCTYPE html><html><head></head><body></body></html>',
  jsdomArgs = {},
) {
  const dom = new jsdom.JSDOM(html, jsdomArgs);
  const allWindowProps = Object.getOwnPropertyNames(dom.window);
  const enumerableWindowProps = Object.keys(dom.window);
  allWindowProps.forEach(windowProp => {
    try {
      if (!globalObject[windowProp]) {
        Object.defineProperty(globalObject, windowProp, {
          value: dom.window[windowProp],
          enumerable: !!~enumerableWindowProps.indexOf(windowProp),
        })
      }
    } catch (e) {
      console.log('skipping property: ' + windowProp);
    }
  })
  globalObject.window = dom.window;
}

module.exports = setGlobalWindow;

module.exports.patch = function() {
  setGlobalWindow(
    global,
    '<!DOCTYPE html><html><head></head><body></body></html>',
    {
      url: 'http://localhost:8000',
      contentType: "text/html",
      storageQuota: 10000000
    },
  );
}
