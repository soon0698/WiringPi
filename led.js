const gpio = require('wiring-pi');
const LED_B = 29;

const TurnOffled = () => {
    gpio.digitalWrite(LED_B, 0);
}

gpio.wiringPiSetup();
gpio.pinMode(LED_B, gpio.OUTPUT);
setTimeout(TurnOffled, 200);
