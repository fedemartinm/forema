import Chalk from 'chalk';
import Forema from './forema';
import Repl from 'repl';

function startup(options = {}) {
  const { development } = options;

  console.log(Chalk.whiteBright('forema-server'));
  console.log('To exit, press ^C.');

  //Instance forema
  const foremaOptions = { development };
  global.forema = new Forema(foremaOptions);

  //Cleanup and exit
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);

  if (development) {
    console.log(Chalk.redBright('Development mode'));
    const repl = Repl.start();
  }

  //Launch!
  start();
}

/**
 * Starts forema-server.
 * Catch unhandled exceptions before the application terminates.
 */
function start() {
  try {
    global.forema.start();
  } catch (error) {
    console.error(error);
    stop();
  }
}

/**
 * Stop and clean-up function
 */
function stop() {
  try {
    global.forema.stop();
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
}

/**
 * No CLI, called directly.
 * e.g. npm run start
 */
if (require.main === module) {
  const development = process.env.NODE_ENV === 'development';
  startup({ development });
}

module.exports = startup;
