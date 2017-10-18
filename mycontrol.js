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
var all_led_is_on = false;

const DetectTouch = () => {
  gpio.digitalWrite(LED_1, 1);
  setTimeout(LED_1Off, 200);
};

const DetectButton = () => {
  if (count == 0){
      console.log("button is pushed");
      gpio.digitalWrite(BUZZER, 1);
      setTimeout(BuzzerOff, 100);
      gpio.digitalWrite(LED_R, 1);
      gpio.digitalWrite(LED_B, 1);
      gpio.digitalWrite(LED_G, 1);
      console.log("first button, all led is turned on");
      all_led_is_on = true;
      count++;
  }
  else {
    all_led_is_on = false;
    gpio.digitalWrite(LED_R, 0);
    gpio.digitalWrite(LED_B, 0);
    gpio.digitalWrite(LED_G, 0);
    gpio.digitalWrite(BUZZER,1);
    setTimeout(BuzzerOff, 100);
    count = 0;
}
};

const DetectSensor = () => {
  if (all_led_is_on) {
    var data = gpio.digitalRead(SENSOR);
    if(data) {
    gpio.digitalWrite(RELAY, gpio.LOW);
    }
    else {
    gpio.digitalWrite(RELAY, gpio.HIGH);
    }
  }
};



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
  all_led_is_on = false;
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

gpio.wiringPiISR(SENSOR, gpio.INT_EDGE_BOTH, DetectSensor);
gpio.wiringPiISR(BUTTON, gpio.INT_EDGE_RISING, DetectButton);
gpio.wiringPiISR(TOUCH, gpio.INT_EDGE_RISING, DetectTouch);
