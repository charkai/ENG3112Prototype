require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

// Import luminosity control logic
const { adjustLight, getCurrentLuminosity, getCurrentHRV, getIsSitting, getIsWarm } = require("./arduino");

app.use(cors());
app.use(express.json());

// API route for controlling the light
app.post("/api/luminosity", (req, res) => {
	const { newLuminosity, warmthOn } = req.body;
	if (newLuminosity >= 0 && newLuminosity <= 255 && (warmthOn == 1 || warmthOn == 0)) {
		adjustLight(newLuminosity, warmthOn);
		console.log(`Luminosity successfully changed to ${newLuminosity} and warmth to ${warmthOn}`);
		res.status(200).json({ message: `Luminosity successfully changed to ${newLuminosity} and warmth to ${warmthOn}` });
	} else {
	res.status(400).json({ message: "Invalid values. Luminosity must be between 0 and 255." });
	}
	
});

// API route for getting current luminosity
app.get("/api/luminosity", (req, res) => {
	const currentLuminosity = getCurrentLuminosity();
	const isCurrentlyWarm = getIsWarm();
	res.status(200).json({ luminosity: currentLuminosity, isWarm: isCurrentlyWarm});
});

// API route for getting current HRV
app.get("/api/hrv", (req, res) => {
	const hrv = getCurrentHRV();
	res.status(200).json({ hrv: hrv });
});

// API route for getting if currently sitting or not 
app.get("/api/sitting", (req, res) => {
	const isSitting = getIsSitting();
	res.status(200).json({ isSitting: isSitting });
})

// Start the server
app.listen(port, () => {
  	console.log(`Server running on port ${port}`);
});
