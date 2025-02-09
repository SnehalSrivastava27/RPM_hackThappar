const axios = require('axios');
require('dotenv').config(); 
class AIWrapper {
    constructor() {
        this.apiKey = process.env.GOOGLE_APPLICATION_CREDENTIALS|| "YOUR_GOOGLE_FIT_API_KEY";
        this.apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

        this.healthTopics = [
            "balanced diet",
            "stress management",
            "heart health",
            "exercise routine",
            "mental well-being",
            "hydration benefits"
        ];
    }

    async callGeminiAPI(prompt) {
        try {
            const response = await axios.post(`${this.apiUrl}?key=${this.apiKey}`, {
                contents: [{ parts: [{ text: prompt }] }]
            });
            return response.data.candidates[0]?.content?.parts[0]?.text || "Sorry, I couldn't generate a response.";
        } catch (error) {
            console.error("Error calling Gemini API:", error.message);
            return "I encountered an issue retrieving data.";
        }
    }
    async generateChallenge() {
        const prompts = [
          "Suggest a challenging but achievable physical activity for someone trying to be more active.",
          "Recommend a healthy eating challenge for someone trying to improve their diet.",
          // Add more challenge prompts as needed
        ];
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        return await this.callGeminiAPI(randomPrompt);
      }

    async getHealthTips(topic) {
        return await this.callGeminiAPI(`Provide detailed health tips on ${topic}`);
    }

    async getHeartRateInfo(age) {
        return await this.callGeminiAPI(`What is the normal resting heart rate for a ${age}-year-old?`);
    }

    async handleUserQuery(query) {
        if (query.toLowerCase().includes("heart rate")) {
            return await this.getHeartRateInfo(25);
        } else if (query.toLowerCase().includes("health")) {
            const topic = this.healthTopics[Math.floor(Math.random() * this.healthTopics.length)];
            return await this.getHealthTips(topic);
        } else {
            return await this.callGeminiAPI(query);
        }
    }
}

module.exports = AIWrapper;
