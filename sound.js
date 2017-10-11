const gpio = require('wiring-pi');
const SOUND = 29; 
var count = 0;

const DetectSound = () => {
  let data = gpio.digitalRead(SOUND);
  if (data) {
    console.log("%d! ", count++);
  }
  setTimeout(DetectSound, 50);
}

gpio.wiringPiSetup();
gpio.pinMode(SOUND, gpio.INPUT);
setTimeout(DetectSound, 50);
