// formRecognizerApi.js
import axios from 'axios';


const endpoint = process.env.REACT_APP_FORM_RECOGNIZER_ENDPOINT;
const apiKey = process.env.REACT_APP_FORM_RECOGNIZER_API_KEY;

// Replace with your Form Recognizer API key

const analyzeForm = async (file) => {
  try {
    const url = `${endpoint}/formrecognizer/v2.1-preview.3/prebuilt/receipt/analyze`;
    const headers = {
      'Content-Type': 'image/jpeg/pdf', // Adjust based on your file type
      'Ocp-Apim-Subscription-Key': apiKey,
    };

    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(url, formData, { headers });
    console.log(response.data); // Check if this logs the API response
    return response.data;
  } catch (error) {
    console.error('Error analyzing form:', error);
    throw error;
  }
};

export { analyzeForm };
