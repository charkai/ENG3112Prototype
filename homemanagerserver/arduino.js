const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

let pulses = [];
let luminosity = 0;

const ARDUINO_PORT = process.env.ARDUINO_PORT || "/dev/ttyUSB0";
let serialPort;

/**
 * Initialize the serial port
 */
function initializeSerialPort() {
    try {
      	serialPort = new SerialPort({
			path: ARDUINO_PORT,
			baudRate: 9600,
      	});

		const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\n" }));

		// Handle serial data received from Arduino
		// TODO: THIS RELIES ON ARDUINO DATA BEING SENT AS 'pulseInterval,luminosity'
		parser.on("data", (data) => {
			const parsedData = data.trim().split(",");
			if (parsedData.length === 2) {
				// FIRST IN DATA = pulse interval
				const pulseInterval = parseInt(parsedData[0], 10);
				if (pulseInterval) {
					pulses.push(pulseInterval);

					// Calculate HRV after every 10 
					if (pulses.length >= 10) {
						const hrv = calculateHRV(pulses);
						pulses = []; // Reset after calculation
						console.log(`HRV: ${hrv}`);
					}
				}

				// SECOND = THE CURRENT LUMINOSITY OF THE LIGHT
				const luminosityValue = parseInt(parsedData[1], 10);
				if (luminosityValue) {
					luminosity = luminosityValue;
				}
			}
			else {
				throw new Error("Invalid data received from Arduino, it must be sent as 'pulseInterval,luminosity'");
			}
		});
			
		// Error handling for serial port
		serialPort.on("error", (err) => {
			console.error("Port error:", err.message);
		});
  	} 
	catch (err) {
		console.error("Port error:", err.message);
	}
}

/**
 * HRV Calculation (Standard Deviation of the R-R intervals) 
 * @param {number[]} intervals - The R-R intervals
 * @returns {number} - The HRV value
 */
function calculateHRV(intervals) {
	const mean = intervals.reduce((a, b) => a + b, 0) / intervals.length;
	const squareDiffs = intervals.map((interval) => Math.pow(interval - mean, 2));
	const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
	return Math.sqrt(avgSquareDiff); // Standard deviation = HRV
}

/**
 * Get the current HRV of the light on the Arduino
 * @returns {number} - The HRV value
 */
function getCurrentHRV() {
  	return calculateHRV(pulses);
}

/**
 * Get the current luminosity of the light on the Arduino
 * @returns {number} - The current luminosity value (0-255)
 */
function getCurrentLuminosity() {
	return luminosity;
}

/**
 * Set the luminosity of the light on the Arduino
 * @param {number} brightness - The brightness value to set (0-255) 
 */
function setLuminosity(brightness) {
    
    if (!serialPort.isOpen) {
        serialPort.open((err) => {
            if (err) {
                console.error(`Failed to open the serial port: ${err.message}`);
            } else {
                console.log("Arduino port opened successfully.");
            }
        });
    }

    serialPort.write(`${brightness}\n`, (err) => {
        if (err) {
            console.error(`Error sending data to Arduino: ${err.message}`);
        }
    });
}


initializeSerialPort();

module.exports = {
	getCurrentHRV,
	getCurrentLuminosity,
	setLuminosity,
};
