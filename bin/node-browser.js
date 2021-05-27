#!/usr/bin/env node
const path = require('path');
const patchNodeRepl = require('../index');

const historyPath = () => {
  const p = process.env.NODE_REPL_HISTORY;
  if (p) return p;
  const home = process.env.HOME || process.cwd();
  return path.resolve(home, '.node_repl_history');
}

const WELCOME = `Welcome to Node.js ${process.version} (browser patch).
Type ".help" for more information.
`;
console.log(WELCOME);

const repl = require("repl").start({
  useGlobal: true,
  preview: true,
});
repl.setupHistory(historyPath(), (err, replServer) => {
  if (err) {
    console.log(err);
  } else {
    patchNodeRepl(replServer.context, '<!DOCTYPE html><html><head></head><body></body></html>', {
      url: 'http://localhost:8000',
      contentType: "text/html",
      storageQuota: 10000000
    });
  }
})
