import { config as configDotEnv } from '@dotenvx/dotenvx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
configDotEnv({path: path.resolve(__dirname, '../env/development.env')});

interface Config {
  nodeEnv: string;
  port: number;
  geminiApiKey: string;
  host: string;
  mongoURI: string;
};

const config: Config = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000'),
  geminiApiKey: process.env.GEMINI_API_KEY ?? '',
  host: process.env.HOST ?? 'localhost',
  mongoURI: process.env.MONGO_URI ?? '',
};

export default config;