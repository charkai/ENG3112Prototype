/*************************************************************
  Pulse Sensor + Thin-Film Pressure Sensor Example with
  Serial LED Brightness & Warmth Control
  ---------------------------------------------------------
  - Serial Input:
      Receives "LEDbrightness,warmthSetting" from an external device.
        • LEDbrightness: integer (0-255)
        • warmthSetting: 1 for warm, 0 for neutral white
  - LED Output:
      In neutral mode:
        • Red   = LEDbrightness
        • Green = LEDbrightness
        • Blue  = LEDbrightness * BLUE_WHITE_SCALE
      In warm mode:
        • Blue gradually fades to 0.
  - Serial Output (when a heartbeat is detected):
      Outputs "pulseInterval,luminosity,warmthSetting,isSitting" where:
        • pulseInterval: Time (ms) between beats
        • luminosity: Average of the LED PWM values (reflecting LED brightness)
        • warmthSetting: 1 for warm (blue off), 0 for neutral white
        • isSitting: 1 if the pressure sensor reading exceeds PRESSURE_THRESHOLD, else 0
  - Pulse sensor connected to A0.
  - Pressure sensor connected to A2.
  - RGB LED connected to PWM pins 9 (red), 10 (green), and 11 (blue).
  
  Serial communication is set at 9600 baud.
*************************************************************/

const int SENSOR_PIN         = A0;      // Pulse sensor signal input
const int RED_PIN            = 9;       // PWM pin for Red LED
const int GREEN_PIN          = 10;      // PWM pin for Green LED
const int BLUE_PIN           = 11;      // PWM pin for Blue LED

// Pulse detection settings:
const int THRESHOLD          = 515;     // Threshold for beat detection
const int BAUD_RATE          = 9600;    // Serial communication speed

// Pressure sensor settings:
const int PRESSURE_PIN       = A2;      // Pressure sensor input pin
const int PRESSURE_THRESHOLD = 100;     // Threshold to determine if someone is sitting

// Calibration constant for white balance in neutral mode:
const float BLUE_WHITE_SCALE = 0.7;     // Scale blue channel to achieve white light

// Variables for heartbeat detection:
bool beatDetected         = false;
unsigned long lastBeatTime = 0;
unsigned long pulseInterval = 0;

// LED brightness & warmth variables:
int baseBrightness = 0;           // LED brightness (from serial input, 0-255)
float currentBlueBrightness = 0;  // Current PWM value for Blue LED (0-255)
bool desiredWarmMode = false;     // Warm mode: false = neutral white, true = warm (blue off)
  
// Pressure sensor state:
bool isSitting = false;           // True if pressure sensor reading > PRESSURE_THRESHOLD

// Fade step for blue brightness (adjust to control fade speed; units: PWM value)
const float blueFadeStep = 2.0;

void setup() {
  Serial.begin(BAUD_RATE);
  
  // Set LED pins as outputs.
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
  
  // Initialize blue channel PWM value.
  currentBlueBrightness = 0;
}

void loop() {
  // --------------------------------------------------
  // 1. Process Serial Input: "LEDbrightness,warmthSetting"
  // --------------------------------------------------
  if (Serial.available() > 0) {
    String command = Serial.readStringUntil('\n');
    command.trim();
    if (command.length() > 0) {
      int commaIndex = command.indexOf(',');
      if (commaIndex > 0) {
        String brightnessStr = command.substring(0, commaIndex);
        String warmthStr = command.substring(commaIndex + 1);
        brightnessStr.trim();
        warmthStr.trim();
        int brightness = brightnessStr.toInt();
        if (brightness < 0) brightness = 0;
        if (brightness > 255) brightness = 255;
        baseBrightness = brightness;
        
        int warmthInput = warmthStr.toInt();
        desiredWarmMode = (warmthInput == 1);  // 1 = warm mode, 0 = neutral white
        
        // If neutral mode, update blue brightness immediately.
        if (!desiredWarmMode) {
          currentBlueBrightness = baseBrightness * BLUE_WHITE_SCALE;
        }
      }
    }
  }
  
  // --------------------------------------------------
  // 2. Read Pulse Sensor and detect a heartbeat.
  // --------------------------------------------------
  int signal = analogRead(SENSOR_PIN);
  if (signal > THRESHOLD && !beatDetected) {
    unsigned long currentTime = millis();
    pulseInterval = currentTime - lastBeatTime;
    lastBeatTime = currentTime;
    beatDetected = true;
    
    // --------------------------------------------------
    // 3. Read Pressure Sensor to determine sitting state.
    // --------------------------------------------------
    int pressureValue = analogRead(PRESSURE_PIN);
    isSitting = (pressureValue > PRESSURE_THRESHOLD);
    
    // --------------------------------------------------
    // 4. Compute current LED luminosity.
    //     We'll use the average of the three channels:
    //       Red   = baseBrightness
    //       Green = baseBrightness
    //       Blue  = currentBlueBrightness
    // --------------------------------------------------
    int luminosity = (baseBrightness + baseBrightness + (int)currentBlueBrightness) / 3;
    
    // --------------------------------------------------
    // 5. Output data as: "pulseInterval,luminosity,warmthSetting,isSitting"
    // --------------------------------------------------
    Serial.print(pulseInterval);
    Serial.print(",");
    Serial.print(luminosity);
    Serial.print(",");
    Serial.print(desiredWarmMode ? 1 : 0);
    Serial.print(",");
    Serial.println(isSitting ? 1 : 0);
  }
  
  // Reset beat detection when the signal falls below the threshold.
  if (signal < THRESHOLD && beatDetected) {
    beatDetected = false;
  }
  
  // --------------------------------------------------
  // 6. Gradually adjust blue channel for warm mode.
  //     - In neutral white, target blue = baseBrightness * BLUE_WHITE_SCALE.
  //     - In warm mode, target blue = 0.
  // --------------------------------------------------
  float targetBlue = desiredWarmMode ? 0.0 : (baseBrightness * BLUE_WHITE_SCALE);
  if (currentBlueBrightness < targetBlue) {
    currentBlueBrightness += blueFadeStep;
    if (currentBlueBrightness > targetBlue) {
      currentBlueBrightness = targetBlue;
    }
  } else if (currentBlueBrightness > targetBlue) {
    currentBlueBrightness -= blueFadeStep;
    if (currentBlueBrightness < targetBlue) {
      currentBlueBrightness = targetBlue;
    }
  }
  
  // --------------------------------------------------
  // 7. Output the current LED values to the RGB LED.
  // --------------------------------------------------
  analogWrite(RED_PIN, baseBrightness);
  analogWrite(GREEN_PIN, baseBrightness);
  analogWrite(BLUE_PIN, (int)currentBlueBrightness);
  
  delay(20); // Short delay for smooth fade transitions and processing.
}
