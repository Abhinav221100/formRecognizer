// App.js
import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FileUploadPage from './FileUploadPage';
import CameraPage from './CameraPage';
import SearchPage from './searchService';
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
          <Tab className="tab-item">Search</Tab>
        </TabList>

        <TabPanel>
          <CameraPage />
        </TabPanel>
        <TabPanel>
          <FileUploadPage />
        </TabPanel>
        <TabPanel>
          <SearchPage />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default App;