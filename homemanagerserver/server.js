require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

// Import luminosity control logic
const { setLuminosity, getCurrentLuminosity, getCurrentHRV, getIsSitting } = require("./arduino");

app.use(cors());
app.use(express.json());

// API route for controlling luminosity
app.post("/api/luminosity", (req, res) => {
	const { value } = req.body;
	if (value >= 0 && value <= 255) {
		setLuminosity(value); 
		console.log(`Luminosity successfully changed to ${value}`);
		res.status(200).json({ message: `Luminosity successfully changed to ${value}` });
	} 
	else {
		res.status(400).json({ message: "Invalid luminosity value. Must be between 0 and 255." });
	}
});

// API route for getting current luminosity
app.get("/api/luminosity", (req, res) => {
	const currentLuminosity = getCurrentLuminosity();
	res.status(200).json({ luminosity: currentLuminosity });
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
