import express from 'express';
import type { Request, Response } from 'express';
import { GoogleGenerativeAI, type GenerateContentResult } from '@google/generative-ai';
// import { GoogleAIFileManager } from '@google/generative-ai/server';
import config from './config.js';
const app = express();

// eslint-disable-next-line max-len
// const apiContent = '[{"question": "What is the main ingredient in the cookies?", "answer": "Chocolate chips"}, {"question": "What is the color of the cookies?", "answer": "Light brown"}, {"question": "What is the texture of the cookies?", "answer": "Soft and chewy"}, {"question": "Describe the shape of the cookies.", "answer": "Round and slightly thick"}, {"question": "On what surface are the cookies placed?", "answer": "A wire cooling rack"}]'

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World Nhat Hoang Nguyen!');
});

const requiredVariables = ['GEMINI_API_KEY'];

for (const variable of requiredVariables) {
  if (!process.env[variable]) {
    console.error(`Missing required environment variable ${variable}`);
  }
}

const apiKey = process.env.GEMINI_API_KEY ?? '';

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});
// const fileManager = new GoogleAIFileManager(apiKey);

// default config for generation by example.
const generationConfig = {
  temperature: 0.9,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 1024,
  responseMimeType: 'application/json',
};

// TODO: finished uploadToGemini function
// async function uploadToGemini(path: string, mimeType: string) {
//   const uploadResult = await fileManager.uploadFile(path, {
//     mimeType,
//     displayName: path,
//   });
//   const file = uploadResult.file;
//   console.log(`Uploaded file: ${file.displayName} as: ${file.name}`);
//   return file;
// }

// Endpoint to call Gemini API
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
app.post('/gemini-api/generate', async (req : Request<{}, {}, GenerateRequestBody>, res : Response) => {
  // TODO: Add file upload to the chat history
  // const path = req.get('path') ??'/Users/nguyennhathoang_1/Desktop/cookies.jpg';
  // const mimeType = req.get('mimeType') ?? 'image/jpeg';
  // const files = [await uploadToGemini(path, mimeType)];
  const textDescription = req.body.textDescription ?? 'A plate of chocolate chip cookies on a wire cooling rack.';
  const quantity = req.body.quantity ?? 5;
  const setting = req.body.setting ?? 'strictly within given information';

  console.log(req.body);
  console.log(`textDescription: ${textDescription}`);
  console.log(`quantity: ${quantity}`);
  console.log(`setting: ${setting}`);

  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: 'user',
        parts: [
          // TODO: Add file data to the chat history
          // {
          //   fileData: {
          //     mimeType: files[0].mimeType,
          //     fileUri: files[0].uri,
          //   },
          // },
          {
            text: 
            `'${textDescription}'
            Based on the given information above - ${setting},
            Create a list of ${quantity} flashcards based on the topic.
            Specify data as type [{"question:" "?", "answer": "answer"}]\n`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            // eslint-disable-next-line max-len
            text: '```json\n[{"question": "What type of food is in the image?", "answer": "Chocolate chip cookies"}, {"question": "How many cookies are visible in the image?", "answer": "Nine"}]\n\n```',
          },
        ],
      },
    ],
  });

  const result : GenerateContentResult = await chatSession.sendMessage(
    'Create a new list of flashcards based on the topic.');
  console.log(result.response.text());
  let jsonResponse;
  try {
    // jsonResponse = JSON.parse(apiContent) as Record<string, string>[];
    jsonResponse = JSON.parse(result.response.text()) as Record<string, string>[];
  } catch (error) {
    jsonResponse = null;
    console.error(error);
  }
  if (jsonResponse != null) {
    const flashCards = bundleFlashCardInformation(jsonResponse);
    res.json({
      status: 'success',
      environment: config.nodeEnv,
      flashCards: flashCards,
      message: 'Successfully generated flash cards',
    });
  } else {
    res.json({
      status: 'error',
      message: 'Failed to generate flash cards',
    });
  }
  
});

function bundleFlashCardInformation(content: Record<string, string>[]) : FlashCard[] {
  return content.map(item => ({
    question: item.question,
    answer: item.answer,
  }));  
}

interface FlashCard {
  question: string;
  answer: string;
};

export { app };

interface GenerateRequestBody {
  textDescription?: string;
  quantity?: number;
  setting?: string;
}