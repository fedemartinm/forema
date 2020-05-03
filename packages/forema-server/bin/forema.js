#!/usr/bin/env node
'use strict';

const meow = require('meow');
const startup = require('../lib');

const helpText = `
Usage: forema [options]

Options:
      --development      development mode

Other options:
  -h, --help         show usage information
  -v, --version      print version info and exit
`;

// CLI Options
const cli = meow(helpText, {
  flags: {
    development: {
      type: 'boolean',
      alias: 'd',
    },
  },
});

// Shortcuts, show and quit
cli.flags.h && cli.showHelp();
cli.flags.v && cli.showVersion();

// Launch
startup(cli.flags);
