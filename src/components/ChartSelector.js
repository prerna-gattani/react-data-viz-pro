import { useState } from 'react';

const chartTypes = [
  { value: 'LineChart', label: 'Line Chart' },
  { value: 'AreaChart', label: 'Area Chart' },
  { value: 'BarChart', label: 'Bar Chart' },
  { value: 'ColumnChart', label: 'Column Chart' },
  { value: 'PieChart', label: 'Pie Chart' },
  { value: 'ScatterChart', label: 'Scatter Plot' },
  { value: 'Histogram', label: 'Histogram' },
  { value: 'ComboChart', label: 'Combo Chart' },
  { value: 'BubbleChart', label: 'Bubble Chart' },
];

const ChartSelector = ({ 
  columns, 
  selectedChart, 
  setSelectedChart, 
  xAxis, 
  setXAxis, 
  yAxis, 
  setYAxis,
  filters,
  setFilters
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (column, value) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">Chart Configuration</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chart Type</label>
          <select
            value={selectedChart}
            onChange={(e) => setSelectedChart(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {chartTypes.map((chart) => (
              <option key={chart.value} value={chart.value}>
                {chart.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">X-Axis</label>
          <select
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select column</option>
            {columns.map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>

        {selectedChart !== 'PieChart' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Y-Axis</label>
            <select
              value={yAxis}
              onChange={(e) => setYAxis(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select column</option>
              {columns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          {showFilters && (
            <div className="mt-2 space-y-2">
              {columns.map(column => (
                <div key={column} className="flex items-center">
                  <label className="flex-1 text-sm text-gray-700">{column}</label>
                  <input
                    type="text"
                    placeholder="Filter value"
                    value={filters[column] || ''}
                    onChange={(e) => handleFilterChange(column, e.target.value)}
                    className="flex-1 p-1 text-sm border border-gray-300 rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartSelector;