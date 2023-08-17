// formRecognizerApi.js
const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

const endpoint = 'https://azformrecogservice.cognitiveservices.azure.com/';
const apiKey = '9b15c490868e48ad85973ebe77134e09';

// const endpoint = 'https://azplatformfr.cognitiveservices.azure.com/';
// const apiKey = 'b1ba541d8851417b91f224526a179584';

// Replace with your Form Recognizer API key

const analyzeForm = async (file) => {
  try {
    console.log(file);
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
 
    // const poller = await client.beginAnalyzeDocument("Form-Recogniser-Demo-1", file);
    const poller = await client.beginAnalyzeDocumentFromUrl("taxinvoice",file);
    // const poller = await client.beginAnalyzeDocumentFromUrl("Form-Recogniser-Demo-1",file); //Pass ModelID and fileURL. Here fileURL is the file itself.
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
