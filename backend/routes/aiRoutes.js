const express = require('express');
const AIWrapper = require('../utils/AIWrapper'); // Adjust path if needed

const router = express.Router();
const aiWrapper = new AIWrapper();

// Route to get health tips
router.get('/health-tips', async (req, res) => {
    try {
        const topic = req.query.topic || "balanced diet"; // Default topic
        const response = await aiWrapper.getHealthTips(topic);
        res.json({ topic, response });
    } catch (error) {
        res.status(500).json({ error: "Error fetching health tips" });
    }
});

// Route to get heart rate info
router.get('/heart-rate', async (req, res) => {
    try {
        const age = req.query.age || 25; // Default age
        const response = await aiWrapper.getHeartRateInfo(age);
        res.json({ age, response });
    } catch (error) {
        res.status(500).json({ error: "Error fetching heart rate info" });
    }
});

// Route to handle any AI-based user query
router.post('/query', async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ error: "Query is required" });
        }
        const response = await aiWrapper.handleUserQuery(query);
        res.json({ query, response });
    } catch (error) {
        res.status(500).json({ error: "Error processing AI query" });
    }
});

router.get('/get-health-data', async (req, res) => {
    try {
      const healthTip = await aiWrapper.getHealthTips('general');
      const challenge = await aiWrapper.generateChallenge();
      res.json({ healthTip, challenge });
    } catch (error) {
      console.error("Error fetching AI data:", error);
      res.status(500).json({ error: 'Failed to fetch AI data' }); // Send JSON error response 
    }
  });


module.exports = router;
