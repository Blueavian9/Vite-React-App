import { DecaChat } from 'Deca-Chat.jsx';

/* The DecaChat constructor accepts a configuration object with the following options: */
interface DecaChat = ({
    apiKey: string;      // Required: Your OpenAI API key
    model?: string;      // Optional: Default 'gpt-4o-mini'
    baseUrl?: string;    // Optional: Default 'https://api.openai.com/v1'
    maxTokens?: number;  // Optional: Default 1000
    temperature?: number; // Optional: Default 0.7
  });

// Initialize the chat client
const chat = new DecaChat({
    apiKey: 'your-openai-api-key'
});

// Send a message and get a response 
async function example( {
    const response = await chat.chat("Hello, how are you");
    console.log(response);
}
);
export interface DecaChat;