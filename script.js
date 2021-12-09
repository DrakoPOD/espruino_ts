const { series } = require('async');
const { fork } = require('child_process');
const yaml = require('js-yaml');
const fs = require('fs');

const userConfig = yaml.load(fs.readFileSync('./app-config.user.yaml'));

const config = {
  ...yaml.load(fs.readFileSync('./app-config.yaml')),
  ...userConfig,
};

function Monitor(cb) {
  const monitor = fork(require.resolve('espruino/bin/espruino-cli'), [
    '--board',
    config.board,
    '-b',
    config.baud,
    '--port',
    config.port,
  ]);
  if (!cb) {
    return;
  }
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
    './dist/index.js',
  ]);
  if (!cb) {
    return;
  }
  upload.on('close', () => {
    cb();
  });
}

function UploadMonitor() {
  series([(cb) => Upload(cb), (cb) => Monitor(cb)]);
}
function Test() {
  console.log('test');
}
module.exports = { Upload, Monitor, UploadMonitor, Test };
