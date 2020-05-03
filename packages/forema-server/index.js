const Repl = require('repl');
const Forema = require('./forema');
const Chalk = require('chalk');

const forema = (global.forema = new Forema({}));

forema.start();

console.log(Chalk.whiteBright('forema-server'));
console.log('(To exit, press ^C again or ^D or type .exit)');

const repl = Repl.start();
repl.on('exit', () => {
  forema.stop();
  process.exit();
});
