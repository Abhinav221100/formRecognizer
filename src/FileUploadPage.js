// FileUploadPage.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { analyzeForm } from './formRecognizerApi';
import { uploadFiles } from './azureBlob';
import './FileUploadPage.css'; // Import the CSS file for styling
const CosmosClient = require('@azure/cosmos').CosmosClient;
const config = require('./config')

const FileUploadPage = () => {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cosmosDBResults, setCosmosDBResults] = useState([]); 

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const analyzeFiles = async () => {
    setLoading(true);
    testCosmosDB();
    // const allResults = await Promise.all(files.map(analyzeSingleFile));
    // setResults(allResults);
    setLoading(false);
  };

  // const fetchResultsFromCosmosDB = async () => 
  // { 
  //   setLoading(true); 
  //   try 
  //   { 
  //     const response = await axios.get('https://azplatformcdb.documents.azure.com:443/', {    
  //       method: 'GET',    
  //       withCredentials: true,    
  //       crossorigin: true,    
  //       mode: 'no-cors',       
  //     }); 
  //     setCosmosDBResults(response.data); 
  //     // Assuming the response data is an array of objects 
  //     setLoading(false); 
  //   } 
  //   catch (error) 
  //   { 
  //     setLoading(false); 
  //     console.error('Error fetching data from Cosmos DB:', error); 
  //   } }; 
    
  //   useEffect(() => 
  //   { // Fetch data from Cosmos DB when the component mounts 
  //     fetchResultsFromCosmosDB(); 
  //   }, []
  // );

  const testCosmosDB = async () =>
  {
    const endpoint = config.endpoint;
    const cosmosKey = config.key;
    console.log("Accessing Azure Cosmos.....");
    const client = new CosmosClient({
      endpoint,
      cosmosKey,
      connectionPolicy: {
        enableEndpointDiscovery: false
      }
    });
    console.log("Cosmos DB accessed!");

    const databaseId = config.database.id
    const containerId = config.container.containerMessages

    const container = client.database(databaseId).container(containerId);

    try {
      const querySpec = {
        query: "SELECT * from c where id =",
      };

      const { resources } = await container.items.query(querySpec).fetchAll();
      resources.forEach((document) => {
        console.log(document);
      });
    }
    catch(error)
    {
      console.error("Error fetching documents:", error);
    }

  }



  const analyzeSingleFile = async (file) => {
    try {
      const formResults = await uploadFiles(file);
      // return formResults;
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
      {/* {cosmosDBResults.length > 0 && (
        <div>
          <h3>Analysis Results:</h3>
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
              {cosmosDBResults.map((cosmosDBResult, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{cosmosDBResult["Mobile Number"]?.value}</td>
                  <td>{cosmosDBResult["Recharge MRP"]?.value}</td>
                  <td>{cosmosDBResult["Date and Time"]?.value}</td>
                  <td>{cosmosDBResult["transaction ID"]?.value}</td>
                  <td>{cosmosDBResult["Payment Status"]?.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}
    </div>
  );
};

export default FileUploadPage;
