const gpio = require('wiring-pi');
const TOUCH = 23;

const CheckTouch = function() {
  var data = gpio.digitalRead(TOUCH);
  if(data)
    console.log("nodejs: touched!");
  setTimeout(CheckTouch, 300);
}

process.on('SIGINT', function() {
  console.log("program exit..");
  process.exit();
});

gpio.wiringPiSetup();
gpio.pinMode(TOUCH, gpio.INPUT);
setTimeout(CheckTouch, 10);
