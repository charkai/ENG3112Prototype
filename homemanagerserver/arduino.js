const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

let pulses = [];
let luminosity = 0;
let isSitting = 0;
let isWarm = 0;

// Flag to indicate that initial Arduino values have been recorded.
// Once set to true, subsequent Arduino data will not override the LED settings.
let arduinoInitialized = false;

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
        // Arduino now sends data as 'pulseInterval,luminosity,warmthSetting,isSitting'
        parser.on("data", (data) => {
            const parsedData = data.trim().split(",");
            if (parsedData.length === 4) {
                // --- Always update the pulse intervals for HRV calculations ---
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
                
                // --- Update LED-related values only if not already initialized ---
                if (!arduinoInitialized) {
                    // SECOND in data = luminosity of the LED (average brightness)
                    const luminosityValue = parseInt(parsedData[1], 10);
                    if (!isNaN(luminosityValue)) {
                        luminosity = luminosityValue;
                    }

                    // THIRD in data = warmth setting (1 for warm, 0 for cool)
                    const isWarmValue = parseInt(parsedData[2], 10);
                    if (isWarmValue === 0 || isWarmValue === 1) {
                        isWarm = isWarmValue;
                    }

                    // FOURTH in data = sitting state (1 for sitting, 0 for standing)
                    const sittingValue = parseInt(parsedData[3], 10);
                    if (sittingValue === 0 || sittingValue === 1) {
                        isSitting = sittingValue;
                    }
                    
                    // Mark as initialized so subsequent data does not override front-end settings.
                    arduinoInitialized = true;
                    console.log("Arduino initial values loaded:");
                    console.log(`Luminosity: ${luminosity}, Warmth: ${isWarm}, Sitting: ${isSitting}`);
                }
            } else {
                throw new Error("Invalid data received from Arduino, it must be sent as 'pulseInterval,luminosity,warmthSetting,isSitting'");
            }
        });
			
        // Error handling for serial port.
        serialPort.on("error", (err) => {
            console.error("Port error:", err.message);
        });

        // Listen for port closure (e.g. Arduino disconnect).
        serialPort.on("close", () => {
            console.log("Serial port closed. Resetting Arduino initialization flag.");
            arduinoInitialized = false;
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
 * Get the current luminosity of the LED set on the Arduino.
 * This value reflects the LED brightness as last initialized.
 * @returns {number} - The current luminosity value (0-255)
 */
function getCurrentLuminosity() {
    return luminosity;
}

/**
 * Gets whether the LED is warm or cool.
 * @returns {number} - 1 if LED is 'warm', 0 if 'cool'
 */
function getIsWarm() {
	return isWarm;
}

/**
 * Set the LED brightness and warmth on the Arduino.
 * This sends a command to the Arduino in the format:
 * "LEDbrightness, warmthSetting" (with warmthSetting being 1 or 0)
 * @param {number} brightness - The brightness value to set (0-255)
 * @param {boolean} warm - true for WARM, false for COOL
 */
function adjustLight(brightness, warm) {
    
    if (!serialPort.isOpen) {
        serialPort.open((err) => {
            if (err) {
                console.error(`Failed to open the serial port: ${err.message}`);
            } else {
                console.log("Arduino port opened successfully.");
            }
        });
    }

    // When the front end sends a new command via adjustLight, we want
    // to override the Arduino-provided values. We also reset our initialization flag.
    arduinoInitialized = false;

    const warmthValue = warm ? 1 : 0;
    serialPort.write(`${brightness},${warmthValue}\n`, (err) => {
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
