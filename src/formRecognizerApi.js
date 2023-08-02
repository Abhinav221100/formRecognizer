// formRecognizerApi.js
import axios from 'axios';
const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

const endpoint = 'https://docappformrec.cognitiveservices.azure.com/';
const apiKey = 'de0f6e8e3348496f9364d5b1b36aaca5';

// Replace with your Form Recognizer API key

const analyzeForm = async (file) => {
  try {
    console.log(file);
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
 
    // const poller = await client.beginAnalyzeDocument("Form-Recogniser-Demo-1", file);
    const poller = await client.beginAnalyzeDocumentFromUrl("sample-train-data",file);
    console.log(poller.data);
    const {documents} = await poller.pollUntilDone();
 
    const document = documents && documents[0];
    if (!document) {
      throw new Error("Expected at least one document in the result.");
    }
 
    console.log(
      "Extracted document:",
      document.docType,
      `(confidence: ${document.confidence || "<undefined>"})`
    );
    console.log("Fields:", document.fields);
    return document.fields;
  } catch (error) {
    console.error('Error analyzing form:', error);
    throw error;
  }
};

export { analyzeForm };
