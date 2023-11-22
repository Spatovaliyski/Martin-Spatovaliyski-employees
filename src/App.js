// App.js
import React, { useState } from 'react';
import FileUpload from './components/file-upload';
import DataProcessor from './components/data-processor';

import './App.css';

const Papa = require('papaparse');

const App = () => {
  const [csvData, setCsvData] = useState(null);

  /** 
   * Handle file upload.
   * 
   * @param {Object} file - File object.
   * 
   * @returns {Array} - Array of employee project data.
   */
  const handleFileUpload = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data);
      },
      header: true,
    });
  };

  return (
    <div className='container'>
      <h1>Employee Project Tracker</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {csvData && <DataProcessor csvData={csvData} />}
    </div>
  );
};

export default App;
