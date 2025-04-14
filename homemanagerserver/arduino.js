const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

let pulses = [];
let luminosity = 0;
let isSitting = 0;
let isWarm = 0;

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

        // Handle serial data received from Arduino.
        // This relies on Arduino data being sent as 'pulseInterval,luminosity,isSitting'
        parser.on("data", (data) => {
            const parsedData = data.trim().split(",");
            if (parsedData.length === 3) {
                // FIRST in data = pulse interval
                const pulseInterval = parseInt(parsedData[0], 10);
                if (!isNaN(pulseInterval)) {
                    pulses.push(pulseInterval);

                    // Calculate HRV after every 10 pulses.
                    if (pulses.length >= 10) {
                        const hrv = calculateHRV(pulses);
                        pulses = []; // Reset after calculation.
                        console.log(`HRV: ${hrv}`);
                    }
                }

                // SECOND in data = luminosity of the light.
                const luminosityValue = parseInt(parsedData[1], 10);
                if (!isNaN(luminosityValue)) {
                    luminosity = luminosityValue;
                }


				/// THIRD = 1 OR 0 for WARM OR COOL (1 FOR WARM 0 FOR COOL)
				const warmValue = parseInt(parsedData[2], 10)
				if (warmValue) {
					isWarm = warmValue;
				}

				/// FOURTH = 1 OR 0 FOR SITTING OR STANDING (1 FOR SITTING, 0 FOR STANDING)
				const sittingValue = parseInt(parsedData[3], 10);
				if (sittingValue) {
					isSitting = sittingValue;
				}

				
			}
			else {
				throw new Error("Invalid data received from Arduino, it must be sent as 'pulseInterval,luminosity, isSitting'");
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
 * Gets whether the pressure sensor is active or not (i.e. user is 'sitting' or 'standing')
 * @returns {number} - 1 for sitting, 0 for standing
 */
function getIsSitting() {
    return isSitting;
}

/**
 * Get the current luminosity of the light on the Arduino
 * @returns {number} - The current luminosity value (0-255)
 */
function getCurrentLuminosity() {
    return luminosity;
}

/**
 * Gets whether light is warm or cold
 * @returns {boolean} - 1 if light is 'warm', 0 if 'cold'
 */
function getIsWarm() {
	return isWarm;
}

/**
 * Set the luminosity and warmth of the light on the Arduino
 * @param {number} brightness - The brightness value to set (0-255) 
 * @param {boolean} isWarm - whether to set to WARM (1) or COOL (0)
 */
function adjustLight(brightness, isWarm) {
    
    if (!serialPort.isOpen) {
        serialPort.open((err) => {
            if (err) {
                console.error(`Failed to open the serial port: ${err.message}`);
            } else {
                console.log("Arduino port opened successfully.");
            }
        });
    }

    serialPort.write(`${brightness} ${isWarm}\n`, (err) => {
        if (err) {
            console.error(`Error sending data to Arduino: ${err.message}`);
        }
    });
}

initializeSerialPort();

module.exports = {
	getCurrentHRV,
	getIsWarm,
	getCurrentLuminosity,
	adjustLight,
	getIsSitting
};
