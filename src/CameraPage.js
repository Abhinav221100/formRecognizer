// CameraPage.js
import React, { useRef, useState } from 'react';
import { analyzeForm } from './formRecognizerApi';

const CameraPage = () => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [query, setQuery] = useState('');
  const [queryResults, setQueryResults] = useState(null);
  const [loading, setLoading] = useState(false); // Add the loading state

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
        console.log('Form Results:', formResults);
        setAnalysisResults(formResults);
        setLoading(false); // Set loading to false after analysis
      } catch (error) {
        setLoading(false); // Set loading to false if an error occurs
        console.error('Error analyzing form:', error);
      }
    }
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleQuerySubmit = async () => {
    // ... (Same as before)

    setLoading(true); // Set loading to true during query processing
    try {
      if (!analysisResults || !analysisResults.data) {
        setQueryResults(null);
        setLoading(false); // Set loading to false if no analysis results
        return;
      }

      const matchedData = analysisResults.data.filter((item) => {
        // ... (Same as before)
      });

      // ... (Same as before)

      setLoading(false); // Set loading to false after query processing
    } catch (error) {
      setLoading(false); // Set loading to false if an error occurs during query
      console.error('Error performing query:', error);
      // Handle errors
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
          <button onClick={analyzeCapturedImage}>Analyze Image</button>
        </div>
      )}
      {loading && <p>Loading...</p>} {/* Show loading message */}
      {analysisResults && (
        <div>
          <h3>Analysis Results:</h3>
          <pre>{JSON.stringify(analysisResults, null, 2)}</pre>
        </div>
      )}
      {/* ... (Same as before) */}
    </div>
  );
};

export default CameraPage;
