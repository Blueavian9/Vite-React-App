import * as React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { CardList } from "./components/CardList";
// import 'node_modules/modern-normalize/modern-normalize.css';
// import './node_modules/sass-extras/index';
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'

import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'

const App = () => (
  <Auth
    supabaseClient={supabase}
    theme="default" // can also be "dark" or "evenDarker"
    appearance={{ theme: ThemeSupa }}
    providers={['google', 'facebook', 'twitter']}
  />
)

const apiKey = import.meta.env.VITE_API_KEY; // Access the environment variable directly
const model = import.meta.env.VITE_MODEL;
const maxTokens = Number(import.meta.env.VITE_MAX_TOKENS);
const temperature = Number(import.meta.env.VITE_TEMPERATURE);
const mode = import.meta.env.MODE;

const supabase = createClient('<INSERT PROJECT URL>', '<INSERT PROJECT ANON API KEY>')

const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("API Key from env:", apiKey); // Check if it's being logged properly

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?apiKey=${apiKey}` // Use the apiKey defined earlier
        );
        const data = await response.json();
        setData(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error); // Proper error logging
        setError(error.message || "Failed to fetch data.");
      } finally {
        setLoading(false); // Stop loading when done
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <a href="/">Data Storage Comparator App</a>
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Storage App</h1>
          <p>Explore features and back-up your data-storage.</p>
          <button className="cta-btn">Learn More</button>
        </div>
      </section>
    

      {/* Data from API */}
      <h1>Data from API</h1>
      <div className="bg-primary text-primary-foreground" />
      <CardList posts = {data}/>
        </div>
  );


export default App;
