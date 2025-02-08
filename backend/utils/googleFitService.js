// utils/googleFitService.js
const axios = require('axios');
require('dotenv').config();

class GoogleFitService {
    constructor() {
        this.apiKey = process.env.GOOGLE_FIT_API_KEY;
        this.baseUrl = "https://www.googleapis.com/fitness/v1/users/me";
    }

    // Function to fetch daily step count
    async getStepCount(accessToken) {
        try {
            const response = await axios.get(`${this.baseUrl}/dataset:aggregate`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                data: {
                    aggregateBy: [{
                        dataTypeName: "com.google.step_count.delta",
                        dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                    }],
                    bucketByTime: { durationMillis: 86400000 }, // 1 day
                    startTimeMillis: Date.now() - 86400000, // 24 hours ago
                    endTimeMillis: Date.now()
                }
            });

            return response.data;
        } catch (error) {
            console.error("Error fetching step count:", error.message);
            return { error: "Failed to fetch step count data" };
        }
    }

    // Function to get heart rate data
    async getHeartRate(accessToken) {
        try {
            const response = await axios.get(`${this.baseUrl}/dataset:aggregate`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                data: {
                    aggregateBy: [{
                        dataTypeName: "com.google.heart_rate.bpm"
                    }],
                    bucketByTime: { durationMillis: 86400000 },
                    startTimeMillis: Date.now() - 86400000,
                    endTimeMillis: Date.now()
                }
            });

            return response.data;
        } catch (error) {
            console.error("Error fetching heart rate:", error.message);
            return { error: "Failed to fetch heart rate data" };
        }
    }
}

module.exports = new GoogleFitService();
