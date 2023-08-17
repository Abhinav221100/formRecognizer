// FileUploadPage.js
import React, { useState } from 'react';
import { analyzeForm } from './TaxInvoiceAPI';
import './TaxInvoiceUpload.css'; // Import the CSS file for styling

const TaxInvoicePage = () => {
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

      const confidenceThreshold = 0.1;
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
      <h2>Tax Invoice Processing</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={analyzeFiles}>Analyze Files</button>
      {loading && <p>Loading...</p>}
      {results.length > 0 && (
        <div>
          <h3>Analysis Results:</h3>
            {results.map((result, index) => {
                const tableValues = [result.table.values.length];
                console.log(tableValues);
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
              }else {
                const table = result["table"];
                return (
                    <div>
                        <table className="result-table">
                            <thead>
                            <tr>
                                <th>File Number</th>
                                <th>Invoice Id</th>
                                <th>Bill To</th>
                                <th>Ship To</th>
                                <th>Invoice date</th>
                                <th>P.O No</th>
                                <th>Due Date</th>
                                <th>SubTotal</th>
                                <th>GST</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{result["Invoice Id"]?.value}</td>
                                <td>{result["Bill To"]?.value}</td>
                                <td>{result["Ship To"]?.value}</td>
                                <td>{result["Invoice date"]?.value}</td>
                                <td>{result["P.O No"]?.value}</td>
                                <td>{result["Due Date"]?.value}</td>
                                <td>{result["SubTotal"]?.value}</td>
                                <td>{result["Gst"]?.value}</td>
                                <td>{result["Total"]?.value}</td>
                                {/* <td>{result["table"]?.value}</td> */}
                            </tr>
                            </tbody>
                        </table>
                        <table class="result-table">
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{table.values[0].properties.DESCRIPTION?.value}</td>
                                    <td>{table.values[0].properties.QTY?.value}</td>
                                    <td>{table.values[0].properties["UNIT PRICE"]?.value}</td>
                                    <td>{table.values[0].properties.AMOUNT?.value}</td>
                                </tr>
                                <tr>
                                    <td>{table.values[1].properties.DESCRIPTION?.value}</td>
                                    <td>{table.values[1].properties.QTY?.value}</td>
                                    <td>{table.values[1].properties["UNIT PRICE"]?.value}</td>
                                    <td>{table.values[1].properties.AMOUNT?.value}</td>
                                </tr>
                                <tr>
                                    <td>{table.values[2].properties.DESCRIPTION?.value}</td>
                                    <td>{table.values[2].properties.QTY?.value}</td>
                                    <td>{table.values[2].properties["UNIT PRICE"]?.value}</td>
                                    <td>{table.values[2].properties.AMOUNT?.value}</td>
                                </tr>                                
                            </tbody>
                        </table>
                        <hr />
                    </div>
                )
              }
            })}
        </div>
      )}
    </div>
  );
};

export default TaxInvoicePage;
