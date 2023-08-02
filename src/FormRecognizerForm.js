// // // FormRecognizerForm.js
// // import React, { useState } from 'react';
// // import { analyzeForm } from './formRecognizerApi';
// // import Webcam from 'react-webcam';

// // const FormRecognizerForm = () => {
// //   const [file, setFile] = useState(null);
// //   const [results, setResults] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const webcamRef = React.useRef(null);

// //   const captureImage = () => {
// //     setLoading(true);
// //     const imageSrc = webcamRef.current.getScreenshot();
// //     const file = dataURLtoFile(imageSrc, 'capture.png');
// //     analyzeAndRecognizeForm(file);
// //     setLoading(false);
// //   };


// //   const analyzeAndRecognizeForm = async (file) => {
// //     setLoading(true);
// //     try {
// //       const formResults = await analyzeForm(file);
// //       setResults(formResults);
// //     } catch (error) {
// //       // Handle errors
// //     } finally {
// //       setLoading(false);
// //     }
// //   };





// //   // const dataURLtoFile = (dataURL, filename) => {
// //   //   const arr = dataURL.split(',');
// //   //   const mime = arr[0].match(/:(.*?);/)[1];
// //   //   const bstr = atob(arr[1]);
// //   //   let n = bstr.length;
// //   //   const u8arr = new Uint8Array(n);
// //   //   while (n--) {
// //   //     u8arr[n] = bstr.charCodeAt(n);
// //   //   }
// //   //   return new File([u8arr], filename, { type: mime });
// //   // };
  
// //   // Helper function to convert data URL to File object
// // const dataURLtoFile = (dataURL, fileName) => {
// //   const arr = dataURL.split(",");
// //   const mime = arr[0].match(/:(.*?);/)[1];
// //   const bstr = atob(arr[1]);
// //   let n = bstr.length;
// //   const u8arr = new Uint8Array(n);
// //   while (n--) {
// //     u8arr[n] = bstr.charCodeAt(n);
// //   }
// //   return new File([u8arr], fileName, { type: mime });
// // };

// // // Rest of the code...


// //   const handleCaptureImage = async () => {
// //     try {
// //       const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
// //       const video = document.createElement("video");
// //       const canvas = document.createElement("canvas");
  
// //       // Attach the camera stream to the video element
// //       video.srcObject = mediaStream;
// //       video.play();
  
// //       // Wait for the video to be ready
// //       video.onloadedmetadata = () => {
// //         // Set the canvas dimensions to match the video
// //         canvas.width = video.videoWidth;
// //         canvas.height = video.videoHeight;
  
// //         // Draw the current video frame on the canvas
// //         const context = canvas.getContext("2d");
// //         context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
// //         // Stop the media stream
// //         mediaStream.getTracks().forEach((track) => track.stop());
  
// //         // Get the data URL of the captured image
// //         const dataURL = canvas.toDataURL("image/jpeg");
  
// //         // Convert the data URL to a File object
// //         const file = dataURLtoFile(dataURL, "captured-image.jpg");
  
// //         // Now you can call the analyzeForm function with the captured image file
// //         setLoading(true);
// //         analyzeForm(file)
// //           .then((formResults) => {
// //             setResults(formResults);
// //             setLoading(false);
// //           })
// //           .catch((error) => {
// //             setLoading(false);
// //             console.error("Error analyzing form:", error);
// //           });
// //       };
// //     } catch (error) {
// //       console.error("Error capturing image:", error);
// //     }
// //   };
  
// // <button onClick={handleCaptureImage}>Capture Image</button>

// //   const handleFileChange = (event) => {
// //     setFile(event.target.files[0]);
// //   };

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     if (file) {
// //       try {
// //         const formResults = await analyzeForm(file);
// //         setResults(formResults);
// //       } catch (error) {
// //         // Handle errors
// //       }
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Form Recognizer App</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input type="file" onChange={handleFileChange} />
// //         <button type="submit">Analyze Form</button>
// //       </form>
// //       {results && (
// //         <div>
// //           <h3>Results:</h3>
// //           <pre>{JSON.stringify(results, null, 2)}</pre>
// //         </div>
// //       )}
// //     <h2>Form Recognizer Captureimage</h2>
// //     <Webcam audio={false} ref={webcamRef} screenshotFormat="image/png" />
// //     <br />
// //     <button onClick={captureImage}>Capture Image</button>
// //     {loading && <p>Loading...</p>}
// //     {results && (
// //       <div>
// //         <h3>Results:</h3>
// //         <pre>{JSON.stringify(results, null, 2)}</pre>
// //       </div>
// //     )}
// //   </div>
// //   );
// // };

// // export default FormRecognizerForm;

// import React, { useState, useRef } from 'react';
// import { analyzeForm } from './formRecognizerApi';

// function dataURLtoFile(dataURL, fileName) {
//   const arr = dataURL.split(',');
//   const mime = arr[0].match(/:(.*?);/)[1];
//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], fileName, { type: mime });
// }


// const FormRecognizerForm = () => {
//   const [file, setFile] = useState(null);
//   const [results, setResults] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const videoRef = useRef();
//   const canvasRef = useRef();

//   const handleCapture = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');

//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then((stream) => {
//         video.srcObject = stream;
//         video.play();
//       })
//       .catch((error) => {
//         console.error('Error accessing camera:', error);
//       });
//   };

//   const handleSnapshot = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');

//     context.drawImage(video, 0, 0, canvas.width, canvas.height);

//     const dataURL = canvas.toDataURL('image/jpeg');
//     const capturedFile = dataURLtoFile(dataURL, 'captured_image.jpg');
//     setFile(capturedFile);
//   };

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//     console.log(event.target.files[0]); // Check if this is logged when you select a file
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log('handleSubmit called');

//     if (file) {
//       setLoading(true);
//       try {
//         const formResults = await analyzeForm(file);
//         setResults(formResults);
//       } catch (error) {
//         // Handle errors
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="form-recognizer-container">
//       <h2>Form Recognizer App</h2>
//       <div className="camera-container">
//         <video ref={videoRef} className="camera-video" />
//         <canvas ref={canvasRef} className="camera-canvas" />
//         <div className="camera-buttons">
//           <button onClick={handleCapture}>Start Camera</button>
//           <button onClick={handleSnapshot}>Take Picture</button>
//         </div>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="file-input">
//           <input type="file" onChange={handleFileChange} />
//           <button type="submit">Analyze File</button>
//         </div>
//         {loading && <p>Loading...</p>}
//       </form>
//       {results && (
//         <div className="results-container">
//           <h3>Results:</h3>
//           <pre>{JSON.stringify(results, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FormRecognizerForm;








// // import React, { useState, useRef } from 'react';
// // import { analyzeForm } from './formRecognizerApi';

// // function dataURLtoFile(dataURL, fileName) {
// //   const arr = dataURL.split(',');
// //   const mime = arr[0].match(/:(.*?);/)[1];
// //   const bstr = atob(arr[1]);
// //   let n = bstr.length;
// //   const u8arr = new Uint8Array(n);
// //   while (n--) {
// //     u8arr[n] = bstr.charCodeAt(n);
// //   }
// //   return new File([u8arr], fileName, { type: mime });
// // }

// // const FormRecognizerForm = () => {
// //   const [file, setFile] = useState(null);
// //   const [results, setResults] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const videoRef = useRef();
// //   const canvasRef = useRef();

// //   const handleCapture = () => {
// //     const video = videoRef.current;
// //     const canvas = canvasRef.current;
// //     const context = canvas.getContext('2d');

// //     navigator.mediaDevices.getUserMedia({ video: true })
// //       .then((stream) => {
// //         video.srcObject = stream;
// //         video.play();
// //       })
// //       .catch((error) => {
// //         console.error('Error accessing camera:', error);
// //       });
// //   };

// //   const handleSnapshot = () => {
// //     const video = videoRef.current;
// //     const canvas = canvasRef.current;
// //     const context = canvas.getContext('2d');

// //     context.drawImage(video, 0, 0, canvas.width, canvas.height);

// //     const dataURL = canvas.toDataURL('image/jpeg');
// //     const capturedFile = dataURLtoFile(dataURL, 'captured_image.jpg');
// //     setFile(capturedFile);
// //   };

// //   const handleFileChange = (event) => {
// //     setFile(event.target.files[0]);
// //     console.log(event.target.files[0]); // Check if this is logged when you select a file
// //   };

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     console.log('handleSubmit called');

// //     if (file) {
// //       setLoading(true);
// //       try {
// //         const formResults = await analyzeForm(file);
// //         setResults(formResults);
// //       } catch (error) {
// //         // Handle errors
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Form Recognizer App</h2>
// //       <div>
// //         <video ref={videoRef} style={{ width: '100%', maxWidth: '400px' }} />
// //         <canvas ref={canvasRef} style={{ display: 'none' }} />
// //         <button onClick={handleCapture}>Start Camera</button>
// //         <button onClick={handleSnapshot}>Take Picture</button>
// //       </div>
// //       <form onSubmit={handleSubmit}>
// //         <input type="file" onChange={handleFileChange} />
// //         <button type="submit">Analyze File</button>
// //         <button type="submit">Analyze Camera Capture</button>
// //       </form>
// //       {loading && <p>Loading...</p>}
// //       {results && (
// //         <div>
// //           <h3>Results:</h3>
// //           <pre>{JSON.stringify(results, null, 2)}</pre>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default FormRecognizerForm;
