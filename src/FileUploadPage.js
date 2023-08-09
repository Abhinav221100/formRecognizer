// FileUploadPage.js
import React, { useState } from 'react';
import { analyzeForm } from './formRecognizerApi';
import './FileUploadPage.css'; // Import the CSS file for styling

const FileUploadPage = () => {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorVals, setErrorVals] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const analyzeFiles = async () => {
    setLoading(true);
    const allResults = await Promise.all(files.map(analyzeSingleFile));
    setResults(allResults);
    setLoading(false);
  };

  const analyzeSingleFile = async (file) => {
    try {
      const formResults = await analyzeForm(file);

      const confidenceThreshold = 0.7;
      console.log("Threshold set...");
      const errorFields = [];
      for(const fieldName in formResults) {
        console.log("Checking threshold...");
        const field = formResults[fieldName];
        if (field.confidence < confidenceThreshold) {
          console.log("Under Threshold...");
          errorFields.push(fieldName);
          // break;
        }
      }
      setErrorVals(errorFields);
      if (errorFields.length > 0) {
        console.error('Error: Some fields have low confidence scores:', errorFields);
        return null;
      }

      return formResults;

    } catch (error) {
      console.error('Error analyzing form:', error);
      return null;
    }
  };

  return (
    <div>
      <h2>File Upload Page</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={analyzeFiles}>Analyze Files</button>
      {loading && <p>Loading...</p>}
      {results.length > 0 && (
        <div>
          <h3>Analysis Results:</h3>
            {results.map((result, index) => {
              if (result == null) {
                return (
                  <div key="discarded">
                    <p>The following fields have low confidence scores:
                    {errorVals.map((errorField, ind) => (
                      <ul>
                        <li key={ind}>{errorField}</li>
                      </ul>
                      ))
                    }</p>
                    <p>The submitted file is not clear enough or does not meet the requirements for analysis. Please submit a clear copy or file of the right format.</p>
                  </div>
                )
              } else {
                return (
                  <table className="result-table">
                    <thead>
                      <tr>
                        <th>File Number</th>
                        <th>Mobile Number</th>
                        <th>Recharge MRP</th>
                        <th>Date and Time</th>
                        <th>Transaction ID</th>
                        <th>Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{result["Mobile Number"]?.value}</td>
                        <td>{result["Recharge MRP"]?.value}</td>
                        <td>{result["Date and Time"]?.value}</td>
                        <td>{result["transaction ID"]?.value}</td>
                        <td>{result["Payment Status"]?.value}</td>
                      </tr>
                    </tbody>
                  </table>
                )
              }
            })}
        </div>
      )}
    </div>
  );
};

export default FileUploadPage;
