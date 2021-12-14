const { series } = require('async');
const { fork } = require('child_process');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const yaml = require('js-yaml');
const fs = require('fs');

const config = yaml.load(fs.readFileSync('./env-config.yaml'));
const argv = yargs(hideBin(process.argv)).argv;

function Monitor(cb) {
  const monitor = fork(require.resolve('espruino/bin/espruino-cli'), [
    '--board',
    config.board,
    '-b',
    config.baud,
    '--port',
    config.port,
  ]);
  monitor.on('close', () => {
    cb();
  });
}

function Upload(cb) {
  const upload = fork(require.resolve('espruino/bin/espruino-cli'), [
    '--board',
    config.board,
    '-b',
    config.baud,
    '--port',
    config.port,
    config.minify == true ? './dist/index.min.js' : './dist/index.js',
  ]);
  upload.on('close', () => {
    cb();
  });
}

function Run() {
  series([
    (cb) => {
      if (argv.upload) {
        Upload(cb);
      } else cb();
    },
    (cb) => {
      if (argv.monitor) {
        Monitor(cb);
      } else cb();
    },
  ]);
}

Run();
