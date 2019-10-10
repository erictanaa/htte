#!/usr/bin/env node
const htte = require('htte');
const program = require('commander');
const updateNotifier = require('update-notifier');

const pkg = require('../package.json');

updateNotifier({ pkg }).notify();

program
  .version(pkg.version)
  .usage('<config-file> [options]')
  .option('--bail', 'Specify whether or not to gracefully stop a htte run on encountering an error')
  .option('--continue', 'Specify whether or not to continue run from abort unit')
  .option('--patch <value>', 'Specify a patch config file to override the options in default config file')
  .parse(process.argv);

let app;
try {
  app = htte.init({
    configFile: program.args[0],
    patch: program.patch
  });
} catch (err) {
  if (process.env.HTTE_DEBUG) {
    console.error(err);
  } else {
    console.log();
    console.log(`\u001b[31m${err.name}: ${err.message}\u001b[0m`);
    console.log();
  }
  process.exit(1);
}

app.run(program).then(isAllSuccess => {
  if (!isAllSuccess) {
    process.exit(1);
  }
});
