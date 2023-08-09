// CameraPage.js
import React, { useRef, useState } from 'react';
import { analyzeForm } from './formRecognizerApi';

const CameraPage = () => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false); // Add the loading state
  const [errorVals, setErrorVals] = useState([]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      setCapturedImage(blob);
    }, 'image/jpeg', 1);
  };

  const analyzeCapturedImage = async () => {
    if (capturedImage) {
      setLoading(true); // Set loading to true during analysis
      try {
        const formResults = await analyzeForm(capturedImage);
        const confidenceThreshold = 0.8;
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
          setAnalysisResults("null");
        }
        else{
        setAnalysisResults(formResults);
        }
        console.log("The analysisresult is ",analysisResults);
        setLoading(false); // Set loading to false after analysis
      } catch (error) {
        setLoading(false); // Set loading to false if an error occurs
        console.error('Error analyzing form:', error);
      }
    }
  };

  return (
    <div>
      <h2>Camera Page</h2>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={captureImage}>Capture Image</button>
      <video ref={videoRef} autoPlay />
      {capturedImage && (
        <div>
          <h3>Captured Image:</h3>
          <img src={URL.createObjectURL(capturedImage)} alt="Captured" />
          <br></br>
          <button onClick={analyzeCapturedImage}>Analyze Image</button>
        </div>
      )}
      {loading && <p>Loading...</p>} {/* Show loading message */}
      {analysisResults && (
        <div>
          <h3>Analysis Results:</h3>
          {(() => {
              if (analysisResults === "null") {
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
                      <tr key="1">
                        <td>1</td>
                        <td>{analysisResults["Mobile Number"]?.value}</td>
                        <td>{analysisResults["Recharge MRP"]?.value}</td>
                        <td>{analysisResults["Date and Time"]?.value}</td>
                        <td>{analysisResults["transaction ID"]?.value}</td>
                        <td>{analysisResults["Payment Status"]?.value}</td>
                      </tr>
                    </tbody>
                  </table>
                )
              }
            })()}
        </div>
      )}
    </div>
  );
};

export default CameraPage;
