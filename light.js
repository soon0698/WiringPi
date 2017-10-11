const gpio = require('wiring-pi');
const LIGHT = 7;
const LED = 27;

const CheckLight = () => {
    gpio.digitalWrite(LED, 0);
    var data = gpio.digitalRead(LIGHT);
    if(! data){
      gpio.digitalWrite(LED, 0);
    }
    else {
      gpio.digitalWrite(LED, 1);
    }
    setTimeout(CheckLight, 500);
}

process.on('SIGINT', ()=> {
    gpio.digitalWrite(LED, 0);
    process.exit();
});

gpio.wiringPiSetup();
gpio.pinMode(LIGHT, gpio.INPUT);
gpio.pinMode(LED, gpio.OUTPUT);
setTimeout(CheckLight, 200);

