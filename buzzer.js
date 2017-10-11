const gpio= require('wiring-pi');

const BUZZER = 29;

const TurnOn = () => {
	gpio.digitalWrite(BUZZER, 1);
	console.log("BUZZER on!");
	setTimeout(TurnOff, 200);
}

const TurnOff = () => {
	gpio.digitalWrite(BUZZER, 0);
	console.log("BUZZER off");
	setTimeout(TurnOn, 1000);
}

gpio.wiringPiSetup();
gpio.pinMode(BUZZER, gpio.OUTPUT);
setTimeout(TurnOn, 200);
