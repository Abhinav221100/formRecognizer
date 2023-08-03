// CameraPage.js
import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { analyzeForm } from './formRecognizerApi';
const CosmosClient = require('@azure/cosmos').CosmosClient;
const config = require('./config')

const CameraPage = () => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [query, setQuery] = useState('');
  const [queryResults, setQueryResults] = useState(null);
  const [loading, setLoading] = useState(false); // Add the loading state
  const [cosmosDBResults, setCosmosDBResults] = useState([]);

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

  // const fetchResultsFromCosmosDB = async () => 
  //       { 
  //           setLoading(true); 
  //           try 
  //           { 
  //               const response = await axios.get('https://azplatformcdb.documents.azure.com:443/'); 
  //               setCosmosDBResults(response.data); 
  //               // Assuming the response data is an array of objects 
  //               setLoading(false); 
  //           } 
  //           catch (error) 
  //           { 
  //               setLoading(false); 
  //               console.error('Error fetching data from Cosmos DB:', error); 
  //           } 
  //       }; 
  //       useEffect(() => { 
  //           // Fetch data from Cosmos DB when the component mounts 
  //           fetchResultsFromCosmosDB(); 
  //       }, []
  //       );


  const testCosmosDB = async () =>
  {
    const endpoint = config.endpoint;
    const cosmosKey = config.key;
    console.log("Accessing Azure Cosmos.....");
    const client = new CosmosClient({ endpoint, cosmosKey });
    console.log("Cosmos DB accessed!");

    const databaseId = config.database.id
    const containerId = config.container.containerMessages

    if(client.database(databaseId).container(containerId)){
      console.log("accessing container");
    }
  }


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
          <br></br>
          <button onClick={analyzeCapturedImage}>Analyze Image</button>
        </div>
      )}
      {loading && <p>Loading...</p>} {/* Show loading message */}
      {analysisResults && (
        <div>
          <h3>Analysis Results:</h3>
          {/* <pre>{JSON.stringify(analysisResults, null, 2)}</pre> */}
          {/* <table className="result-table">
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
                  <td>{cosmosDBResults["Mobile Number"]?.value}</td>
                  <td>{cosmosDBResults["Recharge MRP"]?.value}</td>
                  <td>{cosmosDBResults["Date and Time"]?.value}</td>
                  <td>{cosmosDBResults["transaction ID"]?.value}</td>
                  <td>{cosmosDBResults["Payment Status"]?.value}</td>
                </tr>
            </tbody>
          </table> */}
        </div>
      )}
      
      {/* ... (Same as before) */}
    </div>
  );
};

export default CameraPage;
