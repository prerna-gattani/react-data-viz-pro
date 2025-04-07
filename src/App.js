import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  const [fileData, setFileData] = useState(null);
  const [columns, setColumns] = useState([]);

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            index
            element={<Home setFileData={setFileData} setColumns={setColumns} />} 
          />
          <Route 
            path="dashboard" 
            element={
              <Dashboard 
                fileData={fileData} 
                columns={columns} 
                setFileData={setFileData}
              />
            } 
          />
          <Route path="*" element={<Home setFileData={setFileData} setColumns={setColumns} />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;