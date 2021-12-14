import { config } from './app.config';

var on = false;
setInterval(function () {
  on = !on;
  D2.toggle();
}, config.time);
