const gpio = require('wiring-pi');
const SOUND = 29;
const BLUELED = 7;

const DetectSound = () => {
  gpio.digitalWrite(BLUELED, 1);
  gpio.delay(100);
  gpio.digitalWrite(BLUELED,0);
}

process.on('SIGINT', () => {
  gpio.digitalWrite(BLUELED, 0);
  console.log("exit..");
  process.exit();
});

gpio.wiringPiSetup();
gpio.pinMode(SOUND, gpio.INPUT);
gpio.pinMode(BLUELED, gpio.OUTPUT);
gpio.wiringPiISR(SOUND, gpio.INT_EDGE_RISING, DetectSound);
