/*************************************************************
  Pulse Sensor Example with Calibrated White & Warmth Control
  ---------------------------------------------------------
  - Outputs sensor data strictly as: "pulseInterval,luminosity"
    (and nothing else).
  - Receives brightness values via Serial to set the base brightness.
  - Uses a button on digital pin 2 (with internal pull-up)
    to toggle warm mode.
  - In neutral mode, the LED emits calibrated white:
      • Red:   baseBrightness
      • Green: baseBrightness
      • Blue:  baseBrightness * BLUE_WHITE_SCALE
  - In warm mode, the blue channel fades gradually to off.
  
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
        • One terminal to digital pin 2 (using internal pull-up)
        • Other terminal to GND.
  
  Serial communication: 9600 baud.
*************************************************************/

const int SENSOR_PIN    = A0;      // Pulse sensor input pin
const int RED_PIN       = 9;       // PWM pin for Red channel
const int GREEN_PIN     = 10;      // PWM pin for Green channel
const int BLUE_PIN      = 11;      // PWM pin for Blue channel
const int BUTTON_PIN    = 2;       // Button pin for toggling warm mode
const int THRESHOLD     = 515;     // Threshold for beat detection
const int BAUD_RATE     = 9600;    // Serial communication speed

// Scale factor to reduce blue in neutral white mode.
const float BLUE_WHITE_SCALE = 0.7;  // Adjust as necessary for proper white balance

// Variables for pulse sensor beat detection:
bool beatDetected         = false; 
unsigned long lastBeatTime = 0;
unsigned long pulseInterval = 0;

// LED brightness and warmth variables:
int baseBrightness = 0;           // Base brightness (0-255) received via Serial
float currentBlueBrightness = 0;  // Current blue brightness value (0-255)
bool desiredWarmMode = false;     // false = neutral white; true = warm (blue off)
bool lastButtonState = HIGH;      // Last button reading for edge detection

// Fade step for blue brightness adjustment (in brightness units, 0-255)
// Adjust this value to control the fade speed.
const float blueFadeStep = 2.0;

void setup() {
  // Start Serial communication at the defined baud rate.
  Serial.begin(BAUD_RATE);
  
  // Configure LED pins as outputs.
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
  
  // Configure the button pin with the internal pull-up resistor.
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  
  // Initialize currentBlueBrightness to a neutral white value.
  // (This value will be updated when a new base brightness is received.)
  currentBlueBrightness = 0;
}

void loop() {
  // ***************************************
  // 1. Update base brightness from Serial input.
  // ***************************************
  if (Serial.available() > 0) {
    String command = Serial.readStringUntil('\n');
    command.trim();
    
    if (command.length() > 0) {
      int brightness = command.toInt();
      if (brightness < 0) brightness = 0;
      if (brightness > 255) brightness = 255;
      
      baseBrightness = brightness;
      // When not in warm mode, update blue brightness immediately
      // to maintain neutral white.
      if (!desiredWarmMode) {
        currentBlueBrightness = baseBrightness * BLUE_WHITE_SCALE;
      }
    }
  }
  
  // ***************************************
  // 2. Read pulse sensor and detect beats.
  // ***************************************
  int signal = analogRead(SENSOR_PIN);
  
  // On a rising edge (signal crosses above THRESHOLD), output sensor data.
  if (signal > THRESHOLD && !beatDetected) {
    unsigned long currentTime = millis();
    pulseInterval = currentTime - lastBeatTime;
    lastBeatTime = currentTime;
    beatDetected = true;
    
    // Output data strictly in "pulseInterval,luminosity" format.
    Serial.print(pulseInterval);
    Serial.print(",");
    Serial.println(signal);
  }
  
  // Reset beat detection when the signal falls below the threshold.
  if (signal < THRESHOLD && beatDetected) {
    beatDetected = false;
  }
  
  // ***************************************
  // 3. Check button state for toggling warm mode.
  // ***************************************
  bool buttonState = digitalRead(BUTTON_PIN);
  // Detect a rising edge (transition from LOW to HIGH).
  if (lastButtonState == LOW && buttonState == HIGH) {
    desiredWarmMode = !desiredWarmMode;
  }
  lastButtonState = buttonState;
  
  // ***************************************
  // 4. Gradually adjust blue brightness.
  // ***************************************
  // Determine the target blue brightness:
  // - Neutral mode: Blue is scaled (baseBrightness * BLUE_WHITE_SCALE).
  // - Warm mode: Target is 0.
  float targetBlue = desiredWarmMode ? 0.0 : (baseBrightness * BLUE_WHITE_SCALE);
  
  if (currentBlueBrightness < targetBlue) {
    currentBlueBrightness += blueFadeStep;
    if (currentBlueBrightness > targetBlue)
      currentBlueBrightness = targetBlue;
  } else if (currentBlueBrightness > targetBlue) {
    currentBlueBrightness -= blueFadeStep;
    if (currentBlueBrightness < targetBlue)
      currentBlueBrightness = targetBlue;
  }
  
  // ***************************************
  // 5. Output the RGB LED values.
  // ***************************************
  // Red and Green are maintained at baseBrightness.
  analogWrite(RED_PIN, baseBrightness);
  analogWrite(GREEN_PIN, baseBrightness);
  analogWrite(BLUE_PIN, (int) currentBlueBrightness);
  
  delay(20); // Delay to control fade speed and smooth transitions.
}
