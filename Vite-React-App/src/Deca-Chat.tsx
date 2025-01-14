import { DecaChat } from 'deca-chat';import { sendMessage } from './Deca-Chat';


// Define the configuration interface (optional)
interface DecaChatConfig {
  apiKey: string; // Your OpenAI API key (required)
  model?: string; // Optional: Default 'gpt-4o-mini'
  baseUrl?: string; // Optional: Default 'https://api.openai.com/v1'
  maxTokens?: number; // Optional: Default 1000
  temperature?: number; // Optional: Default 0.7
}

// Ensure the API key is loaded from the environment variables
const chat = new DecaChat({
  apiKey: import.meta.env.VITE_API_KEY || '', // Replace with environment variable
  model: 'gpt-4o-mini', // Optional: Specify the model
  maxTokens: 1000, // Optional: Adjust token limit as needed
  temperature: 0.7, // Optional: Set the temperature
});

// Function to send a message and return a response
export async function sendMessage(message: string): Promise<string> {
  try {
    const response = await chat.chat('Hello, how are you?'); // Send message using DecaChat
    return response;
    console.log(response);
  } catch (error) {
    console.error('Error in DecaChat:', error);
    return 'An error occurred. Please try again later.';
  }
}

// Export the chat instance for reuse (if needed)
export { chat, DecaChatConfig };
