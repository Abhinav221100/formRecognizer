// FormRecognizerForm.js
import React, { useState } from 'react';
import { analyzeForm } from './formRecognizerApi';

const FormRecognizerForm = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]); // Check if this is logged when you select a file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      setLoading(true);
      try {
        const formResults = await analyzeForm(file);
        setResults(formResults);
      } catch (error) {
        // Handle errors
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2>Form Recognizer App</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Analyze Form</button>
      </form>
      {loading && <p>Loading...</p>}
      {results && (
        <div>
          <h3>Results:</h3>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FormRecognizerForm;
