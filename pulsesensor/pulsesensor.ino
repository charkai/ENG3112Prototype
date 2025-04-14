/*************************************************************
  Pulse Sensor + Thin-Film Pressure Sensor Example
  ---------------------------------------------------------
  - Outputs sensor data strictly as: "pulseInterval,luminosity,isSitting"
    (with no additional data or debug messages).
  - Receives brightness values via Serial to set the base brightness
    for an RGB LED.
  - Uses a button on digital pin 2 (with internal pull-up) to toggle warm mode.
  - The RGB LED emits calibrated white when warm mode is off:
      • Red:   baseBrightness
      • Green: baseBrightness
      • Blue:  baseBrightness * BLUE_WHITE_SCALE
  - When warm mode is on, the blue channel fades gradually to 0.
  - A thin-film pressure sensor is read from analog pin A2;
    if its reading exceeds PRESSURE_THRESHOLD then isSitting is 1, otherwise 0.
  
  Wiring:
    - Pulse Sensor:
        • Red:   5V (or 3.3V)
        • Black: GND
        • Purple: Analog signal to A0
    - RGB LED (common cathode):
        • Red   -> PWM pin 9
        • Green -> PWM pin 10
        • Blue  -> PWM pin 11
        • Common cathode to GND.
    - Button:
        • One terminal to digital pin 2 (with internal pull-up)
        • Other terminal to GND.
    - Thin-Film Pressure Sensor:
        • One terminal to analog pin A2 (with appropriate resistor configuration)
        • Other terminal to 5V or GND (depending on your circuit)
  
  Serial communication: 9600 baud.
*************************************************************/

const int SENSOR_PIN         = A0;      // Pulse sensor input pin
const int RED_PIN            = 9;       // PWM pin for Red channel
const int GREEN_PIN          = 10;      // PWM pin for Green channel
const int BLUE_PIN           = 11;      // PWM pin for Blue channel
const int BUTTON_PIN         = 2;       // Button pin for toggling warm mode
const int THRESHOLD          = 515;     // Threshold for beat detection (pulse sensor)
const int BAUD_RATE          = 9600;    // Serial communication speed

// Thin-film pressure sensor settings:
const int PRESSURE_PIN       = A2;      // Analog pin for the pressure sensor
const int PRESSURE_THRESHOLD = 100;     // Threshold for determining if someone is sitting

// Scale factor to reduce blue in neutral white mode:
const float BLUE_WHITE_SCALE = 0.7;     // Adjust to calibrate white balance

// Variables for pulse sensor beat detection:
bool beatDetected         = false;
unsigned long lastBeatTime = 0;
unsigned long pulseInterval = 0;

// LED brightness & warmth variables:
int baseBrightness = 0;           // Base brightness (0-255) from Serial
float currentBlueBrightness = 0;  // Current blue brightness (0-255)
bool desiredWarmMode = false;     // false = neutral white; true = warm mode (blue off)
bool lastButtonState = HIGH;      // Last button state for edge detection

// Fade step for blue brightness adjustment (brightness units in 0-255)
const float blueFadeStep = 2.0;

void setup() {
  Serial.begin(BAUD_RATE);
  
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
  
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  
  // Initialize blue brightness (will be updated once baseBrightness is received)
  currentBlueBrightness = 0;
}

void loop() {
  // --------------------------------------
  // 1. Update base brightness from Serial input.
  // --------------------------------------
  if (Serial.available() > 0) {
    String command = Serial.readStringUntil('\n');
    command.trim();
    if (command.length() > 0) {
      int brightness = command.toInt();
      if (brightness < 0) brightness = 0;
      if (brightness > 255) brightness = 255;
      
      baseBrightness = brightness;
      // If warm mode is off, update blue brightness for a calibrated white light.
      if (!desiredWarmMode) {
        currentBlueBrightness = baseBrightness * BLUE_WHITE_SCALE;
      }
    }
  }
  
  // --------------------------------------
  // 2. Read pulse sensor and detect beats.
  // --------------------------------------
  int signal = analogRead(SENSOR_PIN);
  if (signal > THRESHOLD && !beatDetected) {
    unsigned long currentTime = millis();
    pulseInterval = currentTime - lastBeatTime;
    lastBeatTime = currentTime;
    beatDetected = true;
    
    // --------------------------------------
    // 3. Read pressure sensor (determine if someone is sitting)
    // --------------------------------------
    int pressureValue = analogRead(PRESSURE_PIN);
    bool isSitting = (pressureValue > PRESSURE_THRESHOLD);
    
    // --------------------------------------
    // 4. Output data in the required format:
    //    "pulseInterval,luminosity,isSitting"
    // --------------------------------------
    Serial.print(pulseInterval);
    Serial.print(",");
    Serial.print(signal);
    Serial.print(",");
    Serial.println(isSitting ? 1 : 0);
  }
  
  // Reset beat detection when signal falls below the threshold.
  if (signal < THRESHOLD && beatDetected) {
    beatDetected = false;
  }
  
  // --------------------------------------
  // 5. Check button state for toggling warm mode.
  // --------------------------------------
  bool buttonState = digitalRead(BUTTON_PIN);
  if (lastButtonState == LOW && buttonState == HIGH) {
    desiredWarmMode = !desiredWarmMode;
  }
  lastButtonState = buttonState;
  
  // --------------------------------------
  // 6. Gradually adjust blue brightness for warm mode.
  // --------------------------------------
  float targetBlue = desiredWarmMode ? 0.0 : (baseBrightness * BLUE_WHITE_SCALE);
  if (currentBlueBrightness < targetBlue) {
    currentBlueBrightness += blueFadeStep;
    if (currentBlueBrightness > targetBlue) currentBlueBrightness = targetBlue;
  } else if (currentBlueBrightness > targetBlue) {
    currentBlueBrightness -= blueFadeStep;
    if (currentBlueBrightness < targetBlue) currentBlueBrightness = targetBlue;
  }
  
  // --------------------------------------
  // 7. Output the RGB LED values.
  // --------------------------------------
  analogWrite(RED_PIN, baseBrightness);
  analogWrite(GREEN_PIN, baseBrightness);
  analogWrite(BLUE_PIN, (int)currentBlueBrightness);
  
  delay(20); // Delay to control fade speed and smooth transitions.
}
