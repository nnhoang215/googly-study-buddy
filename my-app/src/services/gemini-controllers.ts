/*
 * Install the Generative AI SDK
 * $ npm install @google/generative-ai
 */

// Load the .env file if not in production, a workaround instead dynamically loading the .env file
// async function loadDotenvIfNeeded() {
//   if (process.env.NODE_ENV !== "production") {
//     const dotenv = await import('dotenv');
//     dotenv.config();
//   }
// }

// Call the function to load dotenv if needed
// loadDotenvIfNeeded();

import { config } from 'dotenv';
config({path: '/Users/nguyennhathoang_1/Workspaces/googly-study-buddy/.env'});

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
const requiredVariables = ["GEMINI_API_KEY"];

for (const variable of requiredVariables) {
  if (!process.env[variable]) {
    console.error(`Missing required environment variable ${variable}`);
    process.exit(1);
  }
}

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

/**
 * Uploads the given file to Gemini.
 *
 * See https://ai.google.dev/gemini-api/docs/prompting_with_media
 */

async function uploadToGemini(path : string, mimeType : string) {
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: path,
  });
  const file = uploadResult.file;
  console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  return file;
}

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 0.9,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 1024,
  responseMimeType: "application/json",
};

export default async function run(path: string, mimeType: string) {
  // TODO Make these files available on the local file system
  // You may need to update the file paths
  // const files = [await uploadToGemini("/Users/nguyennhathoang_1/Desktop/cookies.jpg", "image/jpeg")];
  const files = [await uploadToGemini(path, mimeType)];

  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {
            fileData: {
              mimeType: files[0].mimeType,
              fileUri: files[0].uri,
            },
          },
          {
            text: `Based on the given information.
            Create a list of flashcards based on the topic.  
            Specify the data be in the type [{"question": "?", "answer": "answer"}, others]\n`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            // eslint-disable-next-line max-len
            text: '```json\n[{"question": "What type of food is in the image?", "answer": "Chocolate chip cookies"}, {"question": "How many cookies are visible in the image?", "answer": "Nine"}]\n\n```',
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("Create a new list of flashcards based on the topic.");
  console.log(result.response.text());
}

//run();
