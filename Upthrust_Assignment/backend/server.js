const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const { generateAIResponse } = require("./services/aiService");
const { fetchExternalAPI } = require("./services/apiService");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// POST /run-workflow
app.post("/run-workflow", async (req, res) => {
  try {
    const { prompt, action } = req.body;

    if (!prompt || !action) {
      return res.status(400).json({ error: "Prompt and action are required" });
    }

    // Step 1: AI response
    const aiResponse = await generateAIResponse(prompt);

    // Step 2: API response (Weather, GitHub, News)
    const apiResponse = await fetchExternalAPI(action);

    // Combine
    const finalResult = `${aiResponse} ${apiResponse}`;

    res.json({
      ai_response: aiResponse,
      api_response: apiResponse,
      final_result: finalResult,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));