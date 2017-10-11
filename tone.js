const gpio = require('wiring-pi');
const BUZZER = 29;

var tones = [65, 73, 82, 87, 97, 110, 123, 130,
	     146, 164, 174, 195, 220, 246, 261,
	     294, 330, 349 ,392, 440, 494, 523 ]

var index = 0;

const TurnOn = () => {
	gpio.softToneCreate(BUZZER);
	if(index >= tones.length - 1) index=0;
	gpio.softToneWrite(BUZZER, tones[index++]);
	console.log(" %d order (frequency : %d)", index, tones[index]);
	setTimeout(TurnOn, 1000);
}

gpio.wiringPiSetup();
gpio.pinMode(BUZZER, gpio.OUTPUT);
setImmediate(TurnOn);
