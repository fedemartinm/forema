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
  process.on('SIGINT', () => stop());
  process.on('SIGTERM', () => stop());

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
  console.log('Este arranque');
  global.forema.start().catch((error) => {
    console.log('Pasando por aca');
    stop(error);
  });
}

/**
 * Stop and clean-up function
 */
function stop(error = '') {
  console.log('Este cierre');
  global.forema
    .stop(error)
    .then(() => process.exit(0))
    .catch((error) => console.error(`Error stopping app:${error}`));
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
