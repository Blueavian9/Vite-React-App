import { DecaChat } from 'deca-chat';
import bcrypt from 'bcryptjs'; // or bcrypt if using Node.js
import { fetchHashedKey } from './backendService'; // Adjust path as needed
import fetch from 'node-fetch';

const apiKey = import.meta.env.VITE_API_KEY;
const model = import.meta.env.VITE_MODEL;
const maxTokens = Number(import.meta.env.VITE_MAX_TOKENS);
const temperature = Number(import.meta.env.VITE_TEMPERATURE);

// Function to hash the API key (optional for usage elsewhere)
const saltRounds = 10;
async function hashApiKey(apiKey: string): Promise<string> {
  return await bcrypt.hash(apiKey, saltRounds);
}

// Function to verify the API key
async function verifyApiKey(apiKey: string, hashedKey: string): Promise<boolean> {
  return await bcrypt.compare(apiKey, hashedKey);
}

// Fetch API key from environment
if (!import.meta.env.VITE_API_KEY) {
  throw new Error('API key is missing. Set VITE_API_KEY in your environment variables.');
}
const providedKey = import.meta.env.VITE_API_KEY;

// Simulate fetching hashed key from the backend
const hashedKey = await fetchHashedKey();
if (!(await verifyApiKey(providedKey, hashedKey))) {
  throw new Error('Invalid API key');
}

// Initialize DecaChat instance
const chat = new DecaChat({
  apiKey: providedKey,
  model: import.meta.env.VITE_MODEL || 'gpt-4o-mini',
  maxTokens: Number(import.meta.env.VITE_MAX_TOKENS) || 1000,
  temperature: Number(import.meta.env.VITE_TEMPERATURE) || 0.7,
});

// Example functions
export async function sendMessage(message: string): Promise<string> {
  try {
    return await chat.chat(message);
  } catch (error: any) {
    console.error(error);
    return 'An error occurred. Please try again later.';
  }
}

export function setSystemMessage(message: string): void {
  chat.setSystemMessage(message);
}

export function clearConversation(): void {
  chat.clearConversation();
}

async function initializeChat() {
  if (!import.meta.env.VITE_API_KEY) {
    throw new Error('API key is missing. Set VITE_API_KEY in your environment variables.');
  }

  const providedKey = import.meta.env.VITE_API_KEY;

  // Fetch and verify the hashed key
  const hashedKey = await fetchHashedKey();
  if (!(await verifyApiKey(providedKey, hashedKey))) {
    throw new Error('Invalid API key');
  }

  return new DecaChat({
    apiKey: providedKey,
    model: import.meta.env.VITE_MODEL || 'gpt-4o-mini',
    maxTokens: Number(import.meta.env.VITE_MAX_TOKENS) || 1000,
    temperature: Number(import.meta.env.VITE_TEMPERATURE) || 0.7,
  });
}
