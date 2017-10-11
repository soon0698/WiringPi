const gpio = require('wiring-pi');
const BUTTON = 24;
const BUZZER = 25;
const LED_R  = 27;
const LED_G  = 28;
const LED_B  = 29;

gpio.digitalWrite(LED_B, 0);
gpio.digitalWrite(LED_R, 0);
gpio.digitalWrite(LED_G, 0);

var count = 0;
const TurnOn = () => {
    let data = gpio.digitalRead(BUTTON);
    if(!data){
    console.log("pressed");
    gpio.digitalWrite(BUZZER, 1);
    setTimeout(Buzzeroff, 300);
    switch(count){
       case 0:
       gpio.digitalWrite(LED_B,  1);
       console.log("blue on");
       setTimeout(BlueTurnOff, 300);
       count++;
       break;
      case 1:
      gpio.digitalWrite(LED_R, 1);
      console.log("red on");
      setTimeout(RedTurnOff, 300);
      count++;
      break;
      case 2:
      gpio.digitalWrite(LED_G, 1);
      console.log("green on");
      setTimeout(GreenTurnOff, 300);
      count = 0;
      break;
    }
    }
  setTimeout(TurnOn, 500);
}

process.on('SIGINT', () => {
    console.log("exit");
  process.exit();
});
const BlueTurnOff = () => {
  gpio.digitalWrite(LED_B, 0);
  console.log("blue off");
}

const RedTurnOff = () => {
  console.log("red off");
  gpio.digitalWrite(LED_R, 0);
}

const GreenTurnOff = () => {
  console.log("green off");
  gpio.digitalWrite(LED_G, 0);
}

const Buzzeroff = () => {
  gpio.digitalWrite(BUZZER, 0);
}

gpio.wiringPiSetup();
gpio.pinMode(BUTTON, gpio.INPUT);
gpio.pinMode(BUZZER, gpio.OUTPUT);
gpio.pinMode(LED_R, gpio.OUTPUT);
gpio.pinMode(LED_G, gpio.OUTPUT);
gpio.pinMode(LED_B, gpio.OUTPUT);
setImmediate(TurnOn);
