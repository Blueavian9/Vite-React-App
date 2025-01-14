import { DecaChat } from 'Deca-Chat';  // Make sure the import path is correct

// The DecaChat constructor accepts a configuration object with the following options:
interface DecaChatConfig {
  apiKey: string; // Required: Your OpenAI API key
  // Optional properties can be added as needed
  // model?: string;
  // baseUrl?: string;
  // maxTokens?: number;
  // temperature?: number;
}

// Initialize the chat client
const chat = new DecaChat({
  apiKey: 'import.meta.env.VITE_API_KEY' //'your-openai-api-key', // Replace with your actual API key
});

// Send a message and get a response
async function example() {
  const response = await chat.chat("Hello, how are you?");
  console.log(response);
}

export { DecaChatConfig }; // Export interface if necessary
