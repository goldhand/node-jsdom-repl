# node-jsdom-repl

Monkeypatch your node REPL with browser globals using jsdom.

## Getting Started

Make sure you have `jsdom` installed, if not run:

```
npm install -D jsdom
```

Install this too:

```
npm install -D node-jsdom-repl
```

Start node with the browser context from jsdom:

```
node-browser
```


## Usage

The quickest way to use this is to use the cli command:

```
node-browser
```

### From inside a normal Node.js REPL

Run the node REPL:

```
node
```

And then, from inside the node REPL, import and run:

```
> require('node-jsdom-repl').patch();
```

This should set all the global properties from `jsdom.window` to the Node.js global object.


### Advanced Usage

If you want to pass custom options or use a different global you can

```
> const jsdomGlobalRepl = require('node-jsdom-repl').patch();
> jsdomGlobalRepl(
  global,
  '<html></html>',
  {
    // ... any valid jsdom argument
  }
);
```
