import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  const [fileData, setFileData] = useState(null);
  const [columns, setColumns] = useState([]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/" 
            element={<Home setFileData={setFileData} setColumns={setColumns} />} 
          />
          <Route 
            path="/dashboard" 
            element={
              <Dashboard 
                fileData={fileData} 
                columns={columns} 
                setFileData={setFileData}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;