import { config as configDotEnv } from '@dotenvx/dotenvx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
configDotEnv({path: path.resolve(__dirname, '../env/.development.env')});

interface Config {
  nodeEnv: string;
  port: number;
  geminiApiKey: string;
  host: string;
  mongoURI: string;
  hmacKey: string;
};

const config: Config = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000'),
  geminiApiKey: process.env.GEMINI_API_KEY ?? '',
  host: process.env.HOST ?? 'localhost',
  mongoURI: process.env.MONGO_URI ?? '',
  hmacKey: process.env.HMAC_KEY ?? '',
};

const requiredEnvVars = [
  'MONGO_URI',
  'GEMINI_API_KEY',
  'HMAC_KEY',
] as const;

for (const envVar of requiredEnvVars) {
  if (process.env[envVar] === undefined) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export default config;