// @flow
/* eslint-disable no-console, global-require */

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

// code to run if we're in the master process
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // fork workers for each CPU
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    // replace the dead worker, we're not sentimental
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  require('./index');
}
