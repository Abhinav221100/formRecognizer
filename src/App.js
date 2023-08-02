// App.js
import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FileUploadPage from './FileUploadPage';
import CameraPage from './CameraPage';
import './App.css'; // Import your global CSS file if you have any
import './CameraPage.css';

const App = () => {
  return (
    <div className="app-container">
      <h1>Form-Recognizer App</h1>
      <Tabs>
        <TabList className="tab-list">
          <Tab className="tab-item">Camera</Tab>
          <Tab className="tab-item">File Upload</Tab>
        </TabList>

        <TabPanel>
          <CameraPage />
        </TabPanel>
        <TabPanel>
          <FileUploadPage />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default App;


// //import FormRecognizerForm from './FormRecognizerForm';
// // App.js
// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import CameraPage from './CameraPage';
// import FileUploadPage from './FileUploadPage';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <nav>
//           <ul>
//             <li>
//               <Link to="/camera">Camera</Link>
//             </li>
//             <li>
//               <Link to="/file-upload">File Upload</Link>
//             </li>
//           </ul>
//         </nav>
//         <Routes>
//           <Route path="/camera" element={<CameraPage />} />
//           <Route path="/file-upload" element={<FileUploadPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// function App() {
//   return (
//     <div className="App">
//       <FormRecognizerForm />
//     </div>
//   );
// }

// export default App;
