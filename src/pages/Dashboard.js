import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import ChartSelector from '../components/ChartSelector';
import Visualization from '../components/Visualization';
import GeminiRecommendation from '../components/GeminiRecommendation';

const Dashboard = ({ fileData, columns, setFileData }) => {
  const [selectedChart, setSelectedChart] = useState('LineChart');
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();

  const handleReset = () => {
    setFileData(null);
    navigate('/');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
        <button 
          onClick={handleReset}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Upload New File
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <DataTable data={fileData} columns={columns} />
          <ChartSelector 
            columns={columns} 
            selectedChart={selectedChart}
            setSelectedChart={setSelectedChart}
            xAxis={xAxis}
            setXAxis={setXAxis}
            yAxis={yAxis}
            setYAxis={setYAxis}
            filters={filters}
            setFilters={setFilters}
          />
          <GeminiRecommendation 
            data={fileData} 
            columns={columns} 
            setSelectedChart={setSelectedChart}
            setXAxis={setXAxis}
            setYAxis={setYAxis}
          />
        </div>
        <div className="lg:col-span-2">
          <Visualization 
            data={fileData} 
            chartType={selectedChart} 
            xAxis={xAxis} 
            yAxis={yAxis}
            filters={filters}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;