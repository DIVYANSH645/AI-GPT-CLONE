import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function summaryController(req, res) {
    try {
        const { text } = req.body;

        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Summarize this \n${text}`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const generatedText = response.text();

        return res.status(200).json(generatedText);
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
}
// paragraphController
export async function paragraphController(req, res) {
    try {
        const { text } = req.body;

        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `write a detail paragraph about \n${text}`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const generatedText = response.text();

        return res.status(200).json(generatedText);
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};
export async function chatbotController(req, res) {
    try {
        const { text } = req.body;

        // For chatbot interaction, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Answer a question similar to how Iron man from Avengers would respond:\nMe: 'What is your name?'\nYoda: 'Iron man is my name'\nMe: ${text}`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const generatedText = response.text();

        return res.status(200).json(generatedText);
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};
export async function jsconverterController(req, res) {
    try {
        const { text } = req.body;

        // For text-to-code conversion, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `/* Convert these instructions into JavaScript code:\n${text}`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const generatedText = response.text();

        return res.status(200).json(generatedText);
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};

