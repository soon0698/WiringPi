const gpio = require('wiring-pi');
const SOUND = 7;
const BLUELED = 29;

const DetectSound = () => {
  gpio.digitalWrite(BLUELED, 0);
  var data = gpio.digitalRead(SOUND);
  if( data ){
    gpio.digitalWrite(BLUELED, 1);
    console.log("nodejs : it sounds loud");
  }
setTimeout(DetectSound, 50);
}

process.on('SIGINT', () => {
    gpio.digitalWrite(BLUELED, 0);
    process.exit();
});

gpio.wiringPiSetup();
gpio.pinMode(SOUND, gpio.INPUT);
gpio.pinMode(BLUELED, gpio.OUTPUT);
setTimeout(DetectSound, 1);
