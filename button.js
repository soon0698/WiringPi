const gpio = require('wiring-pi');
const BUTTON = 25;

const LEDPIN = 29;
var count = 0;

const CheckButton = () => {
	let data = gpio.digitalRead(BUTTON);
	if(!data)
	{
	console.log("button Pressed!");
	TimeOutHandler();
}
	setTimeout(CheckButton, 300);

}

const TimeOutHandler = () => {
	if (count > 0  ) {
		gpio.digitalWrite(LEDPIN, 1);
		console.log("Node:LED on");
		count = 0;
	}
	else {
		gpio.digitalWrite(LEDPIN, 0);
		console.log("Node:LED off");
		count = 1;
	}
}

process.on('SIGINT', function() {
	console.log("exit..");
	process.exit();
});

gpio.wiringPiSetup();
gpio.pinMode(LEDPIN, gpio.OUTPUT);
gpio.pinMode(BUTTON, gpio.INPUT);
setImmediate(CheckButton);

