import { DecaChat } from 'deca-chat';

// Define the configuration interface (optional)
interface DecaChatConfig {
  apiKey: string; // Your OpenAI API key (required)
  model?: string; // Optional: Default 'gpt-4o-mini'
  baseUrl?: string; // Optional: Default 'https://api.openai.com/v1'
  maxTokens?: number; // Optional: Default 1000
  temperature?: number; // Optional: Default 0.7
}

// Ensure the API key is securely loaded
if (!import.meta.env.VITE_API_KEY) {
  throw new Error('API key is missing. Set VITE_API_KEY in your environment variables.');
}

// Initialize the DecaChat instance
const chat = new DecaChat({
  apiKey: import.meta.env.VITE_API_KEY,
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
}
  // if (import.meta.env.MODE === 'development') {
  //   console.log('Conversation history cleared.'); run 
  // }

// Function to dynamically update the system message
export function setSystemMessage(message: string): void {
  chat.setSystemMessage(message);
}

// Export the chat instance for reuse (if needed)
export { chat, DecaChatConfig };
