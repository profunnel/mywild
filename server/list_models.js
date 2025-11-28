require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        // For v1beta, we might need to use the model manager if available, 
        // or just try to get a model and see if it works. 
        // Actually, the library doesn't have a direct 'listModels' on the client instance in some versions.
        // But let's try to use the generic request if possible, or just try a different model.

        // Actually, let's just try 'gemini-1.0-pro' as a fallback test in this script.
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        const result = await model.generateContent("Test");
        console.log("gemini-1.0-pro worked:", result.response.text());
    } catch (error) {
        console.error("gemini-1.0-pro failed:", error.message);
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent("Test");
        console.log("gemini-1.5-flash-latest worked:", result.response.text());
    } catch (error) {
        console.error("gemini-1.5-flash-latest failed:", error.message);
    }
}

listModels();
