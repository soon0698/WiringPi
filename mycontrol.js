const gpio = require('wiring-pi');
const BUTTON = 29;
const RELAY = 21;
const LED_R = 25;
const LED_B = 24;
const LED_G = 23;
const TOUCH = 28;
const SENSOR = 27;
const LED_1 = 22;
const BUZZER = 26;

var count = 0;
var lightsensor = 0;
const TurnOn = () => {
  var touch = gpio.digitalRead(TOUCH);
  var button = gpio.digitalRead(BUTTON);
  var sensor = gpio.digitalRead(SENSOR);
  if(touch){
  gpio.digitalWrite(LED_1, 1);
  setTimeout(LED_1Off, 200);
  }
  if (!button && count == 0){
      console.log("touched");
      gpio.digitalWrite(BUZZER, 1);
      setTimeout(BuzzerOff, 100);
      gpio.digitalWrite(LED_R, 1);
      gpio.digitalWrite(LED_B, 1);
      gpio.digitalWrite(LED_G, 1);
      console.log("first touch, all led is turned on");
      lightsensor = 1;
      count++;
  }
  else {
      if(lightsensor == 1 && !sensor){
        gpio.digitalWrite(RELAY, gpio.HIGH);
      }
      if(lightsensor == 1 && sensor) {
        gpio.digitalWrite(RELAY, gpio.LOW);
      }
    if(!button && count == 1) {
      gpio.digitalWrite(BUZZER, 1);
      setTimeout(BuzzerOff, 100);
      gpio.digitalWrite(LED_R, 0);
      gpio.digitalWrite(LED_B, 0);
      gpio.digitalWrite(LED_G, 0);
      console.log("second touch, all led is turned off");
      lightsensor = 0;
      count = 0;
    }
  }
  setTimeout(TurnOn, 500);
}

const BuzzerOff = () => {
  gpio.digitalWrite(BUZZER, 0);
}

const LED_1Off = () => {
  gpio.digitalWrite(LED_1, 0);
}

process.on('SIGINT', () => {
  gpio.digitalWrite(LED_R, 0);
  gpio.digitalWrite(LED_B, 0);
  gpio.digitalWrite(LED_G, 0);
  gpio.digitalWrite(BUZZER, 0);
  gpio.digitalWrite(RELAY, gpio.LOW);
  gpio.digitalWrite(LED_1, 0);
  console.log("all device is turned off");
  process.exit();
});

gpio.wiringPiSetup();
gpio.pinMode(LED_1, gpio.OUTPUT);
gpio.pinMode(LED_R, gpio.OUTPUT);
gpio.pinMode(LED_G, gpio.OUTPUT);
gpio.pinMode(LED_B, gpio.OUTPUT);
gpio.pinMode(SENSOR, gpio.INPUT);
gpio.pinMode(BUTTON, gpio.INPUT);
gpio.pinMode(RELAY, gpio.OUTPUT);
gpio.pinMode(TOUCH, gpio.INPUT);

setTimeout(TurnOn, 1);
