import * as React from 'react';
import React, { useEffect, useState } from 'react'
import './App.css'


const apiKey = import.meta.env.VITE_API_KEY;
const model = import.meta.env.VITE_MODEL;
const maxTokens = Number(import.meta.env.VITE_MAX_TOKENS);
const temperature = Number(import.meta.env.VITE_TEMPERATURE);



const fetchData = async () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  try {
    const response = await fetch(`https://api.example.com/data?apiKey=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1>Data from API</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default App;
