/*************************************************************
  HW-827 Pulse Sensor Example
  Continuously outputs: "pulseInterval,luminosity"
  
  Wiring (typical for many Pulse Sensors):
    - Red:   5V (or 3.3V)
    - Black: GND
    - Purple: Analog signal to A0

  Important:
    - Adjust 'threshold' if needed.
    - Open Serial Monitor at 9600 baud.
*************************************************************/

const int SENSOR_PIN   = A0;      // HW-827 output to A0
const int THRESHOLD    = 515;     // Analog threshold for beat detection
const int BAUD_RATE    = 9600;    // Serial port speed

// Variables for detecting pulse edges and timing:
bool beatDetected         = false; 
unsigned long lastBeatTime = 0;
unsigned long pulseInterval = 0;

void setup() {
  Serial.begin(BAUD_RATE);
}

void loop() {
  // Read the analog value from the sensor
  int signal = analogRead(SENSOR_PIN);

  // Rising edge check (signal crosses above threshold)
  if (signal > THRESHOLD && !beatDetected) {
    unsigned long currentTime = millis();

    pulseInterval  = currentTime - lastBeatTime;
    lastBeatTime   = currentTime;
    beatDetected   = true;

    // "luminosity" here is just our raw reading from A0
    int luminosity = signal;

    // Print the data in the required format
    Serial.print(pulseInterval);
    Serial.print(",");
    Serial.println(luminosity);
  }

  // If signal has dropped below threshold, allow next beat detection
  if (signal < THRESHOLD && beatDetected) {
    beatDetected = false;
  }

  delay(20); // Short delay to avoid floods of readings
}
