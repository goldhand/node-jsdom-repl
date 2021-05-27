#!/usr/bin/env node
const path = require('path');

const moduleExists = location => {
  try {
    return require.resolve(location);
  } catch (err) {
    if (err && err.code === 'MODULE_NOT_FOUND') {
      return false;
    }
    // log and return error if there is an issue other than not found
    logError(err);
    return err;
  }
};

const hasDependency = (pkgJson, dependency) => (
  !!(pkgJson.dependencies && pkgJson.dependencies[dependency])
  || !!(pkgJson.devDependencies && pkgJson.devDependencies[dependency])
);

const dependencyExists = (dependency) => {
  const pkgJson = path.resolve(process.cwd(), 'package.json');
  return hasDependency(pkgJson, dependency);
}

const MISSING_JSDOM = `
WARNING! Missing peer dependency: jsdom

node-jsdom-repl requires jsdom for node-browser to work

npm install -D jsdom
`;

const checkJsdomDependency = () => {
  if (!process.env.INIT_CWD) return true; // give up
  const prevCwd = process.cwd();
  process.chdir(process.env.INIT_CWD);
  if (!moduleExists('jsdom') && !dependencyExists('jsdom')) {
    console.warn(MISSING_JSDOM);
  }
  process.chdir(prevCwd); // clean up (maybe?)
}
checkJsdomDependency();
