'use client'; // Ensure this is a Client Component

import { useState } from 'react';
// import './styles.css'; // Assuming you have CSS styles in styles.css

export default function Home() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setGender(null);

    if (!name) {
      setError('Please enter a name.');
      return;
    }

    try {
      // Directly call the Genderize API here
      const response = await fetch(`https://api.genderize.io?name=${name}`);

      // Check for a successful response
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setGender(data);
      }
    } catch (err) {
      setError('Failed to fetch gender. Try again later.');
    }
  };

  return (
    <div className="container">
      <h1>Genderize.io</h1>
      <h4>Checks the gender of a person based on a first name</h4>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name"
          className="input"
        />
        <button type="submit" className="button">Check Gender</button>
      </form>

      {error && <p className="error">{error}</p>}

      {gender && (
        <div className="results">
          <h2>Results</h2>
          <p><strong>Name:</strong> {gender.name}</p>
          <p><strong>Gender:</strong> {gender.gender || 'Unknown'}</p>
          <p><strong>Probability:</strong> {gender.probability}</p>
        </div>
      )}
    </div>
  );
}
