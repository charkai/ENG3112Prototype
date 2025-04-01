require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

// Import luminosity control logic
const { setLuminosity, getCurrentLuminosity, getCurrentHRV } = require("./arduino");

app.use(cors());
app.use(express.json());

// API route for controlling luminosity
app.post("/api/luminosity", (req, res) => {
	const { value } = req.body;
	if (value >= 0 && value <= 255) {
		// TODO: ACTUALLY WRITE TO ARDUINO
		// setLuminosity(value); 
		res.status(200).json({ message: `Luminosity successfully changed to ${value}` });
	} 
	else {
		res.status(400).json({ message: "Invalid luminosity value. Must be between 0 and 255." });
	}
});

// API route for getting current luminosity
app.get("/api/luminosity", (req, res) => {

	// TODO: ACTUALLY READ FROM ARDUINO
	const currentLuminosity = 200;
	// const currentLuminosity = getCurrentLuminosity();
	res.status(200).json({ luminosity: currentLuminosity });
});

// API route for getting current HRV
app.get("/api/hrv", (req, res) => {
	// TODO: ACTUALLY READ FROM ARDUINO
	const hrv = 42;
	// const hrv = getCurrentHRV();
	res.status(200).json({ hrv: hrv });
});

// Start the server
app.listen(port, () => {
  	console.log(`Server running on port ${port}`);
});
