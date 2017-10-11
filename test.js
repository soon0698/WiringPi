const gpio = require('wiring-pi');

const LED_R = 27;

gpio.digitalWrite(LED_R, 1);

gpio.wiringPiSetup();
gpio.pinMode(LED_R, gpio.OUTPUT);

process.on('SIGINT', () => {
    gpio.digitalWrite(LED_R, 0);
    process.exit();
});
