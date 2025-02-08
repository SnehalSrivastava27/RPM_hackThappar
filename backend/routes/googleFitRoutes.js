// routes/googleFitRoutes.js
const express = require('express');
const googleFitService = require('../utils/googleFitService');
const router = express.Router();

// Endpoint to fetch step count
router.get('/steps', async (req, res) => {
    const accessToken = req.headers.authorization?.split(" ")[1]; // Extract Bearer token
    if (!accessToken) {
        return res.status(401).json({ error: "Missing access token" });
    }

    const stepData = await googleFitService.getStepCount(accessToken);
    res.json(stepData);
});

// Endpoint to fetch heart rate data
router.get('/heart-rate', async (req, res) => {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
        return res.status(401).json({ error: "Missing access token" });
    }

    const heartRateData = await googleFitService.getHeartRate(accessToken);
    res.json(heartRateData);
});

module.exports = router;
