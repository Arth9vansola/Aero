import axios from "axios";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ message: "Prompt is required" });
    }

    try {
        const apiKey = process.env.VITE_GOOGLE_AI_API_KEY;
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
            {
                contents: [{ role: "user", parts: [{ text: prompt }] }]
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching response", error });
    }
}
