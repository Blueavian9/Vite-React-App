import { DecaChat } from 'deca-chat';
import bcrypt from 'bcrypt'; 
import { fetchHashedKey } from './backendService'; // Simulated backend call

// SQL Script (should be executed in the database, not here)
/**
CREATE TABLE api_keys (
  id SERIAL PRIMARY KEY,
  hashed_key TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO api_keys (hashed_key) VALUES ('<hashed_api_key>');
*/

// Function to securely fetch and validate the API key
async function getApiKey(): Promise<string> {
  const hashedKey = await fetchHashedKey(); // Fetch the hashed key from the backend
  const providedKey = import.meta.env.VITE_API_KEY;

  if (!providedKey || !(await verifyApiKey(providedKey, hashedKey))) {
    throw new Error('Invalid or missing API key');
  }

  return providedKey;
}

// Function to hash the API key 
const saltRounds = 10;
async function hashApiKey(apiKey: string): Promise<string> {
  return await bcrypt.hash(apiKey, saltRounds);
}

// Function to verify the API key
async function verifyApiKey(apiKey: string, hashedKey: string): Promise<boolean> {
  return await bcrypt.compare(apiKey, hashedKey);
}

// Initialize the DecaChat instance with the validated API key
const apiKey = await getApiKey();
const chat = new DecaChat({
  apiKey,
  model: import.meta.env.VITE_MODEL || 'gpt-4o-mini',
  maxTokens: Number(import.meta.env.VITE_MAX_TOKENS) || 1000,
  temperature: Number(import.meta.env.VITE_TEMPERATURE) || 0.7,
});

// Set a default system message
chat.setSystemMessage('You are a helpful and friendly assistant ready to answer questions.');

// Function to send a message and return a response
export async function sendMessage(message: string): Promise<string> {
  try {
    const response = await chat.chat(message);
    if (import.meta.env.MODE === 'development') {
      console.log('AI Response:', response);
    }
    return response;
  } catch (error: any) {
    console.error('Error in DecaChat:', error);

    if (error.response?.status === 401) {
      return 'Invalid API key. Please check your configuration.';
    }
    if (error.response?.status === 429) {
      return 'Rate limit exceeded. Please wait and try again.';
    }
    return 'An error occurred. Please try again later.';
  }
}

// Function to clear the conversation history
export function clearConversation(): void {
  chat.clearConversation();
  if (import.meta.env.MODE === 'development') {
    console.log('Conversation history cleared.');
  }
}

// Function to dynamically update the system message
export function setSystemMessage(message: string): void {
  chat.setSystemMessage(message);
}

// Export the chat instance and configuration interface for reuse (if needed)
interface DecaChatConfig {
  apiKey: string; // Your OpenAI API key (required)
  model?: string; // Optional: Default 'gpt-4o-mini'
  baseUrl?: string; // Optional: Default 'https://api.openai.com/v1'
  maxTokens?: number; // Optional: Default 1000
  temperature?: number; // Optional: Default 0.7
}

export { chat, DecaChatConfig };