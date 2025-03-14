import React, { useState, useCallback } from "react";
import "./App.css"; // Include styling if needed
const App = () => {
  const [length, setLength] = useState(7);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeChars, setIncludeChars] = useState(false);
  const [password, setPassword] = useState("");

  // Function to generate password
  const generatePassword = useCallback(() => {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) characters += "0123456789";
    if (includeChars) characters += "!@#$%^&*()-_=+{}[]<>?/";

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters.charAt(randomIndex);
    }
    setPassword(newPassword);
  }, [length, includeNumbers, includeChars]);

  // Function to copy password to clipboard
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  }, [password]);

  return (
    <div className="container">
      <h2>Password Generator</h2>
      <input type="text" value={password} readOnly placeholder="Generated Password" />
      <button onClick={copyToClipboard}>Copy</button>
      
      <div>
        <input 
          type="range" 
          min="6" 
          max="20" 
          value={length} 
          onChange={(e) => setLength(e.target.value)}
        />
        <label>Length: {length}</label>
      </div>

      <div>
        <input 
          type="checkbox" 
          checked={includeNumbers} 
          onChange={() => setIncludeNumbers(!includeNumbers)}
        />
        <label>Include Numbers</label>

        <input 
          type="checkbox" 
          checked={includeChars} 
          onChange={() => setIncludeChars(!includeChars)}
        />
        <label>Include Special Characters</label>
      </div>

      <button onClick={generatePassword}>Generate Password</button>
    </div>
  );
};

export default App;
