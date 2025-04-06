import { Chart } from 'react-google-charts';
import { useMemo } from 'react';

const Visualization = ({ data, chartType, xAxis, yAxis, filters }) => {
  const chartData = useMemo(() => {
    if (!data || !xAxis || (!yAxis && chartType !== 'PieChart')) return null;

    // Apply filters
    const filteredData = data.filter(row => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return String(row[key]).toLowerCase().includes(value.toLowerCase());
      });
    });

    // Prepare data for the chart
    const headers = chartType === 'PieChart' ? [xAxis, yAxis || 'Count'] : [xAxis, yAxis];
    
    const rows = filteredData.map(row => {
      if (chartType === 'PieChart') {
        return [row[xAxis], yAxis ? parseFloat(row[yAxis]) || 0 : 1];
      }
      return [
        row[xAxis],
        parseFloat(row[yAxis]) || 0
      ];
    });

    return [headers, ...rows];
  }, [data, chartType, xAxis, yAxis, filters]);

  if (!chartData) {
    return (
      <div className="bg-white p-8 rounded-lg shadow flex items-center justify-center h-64">
        <p className="text-gray-500">Please select X and Y axes to generate the chart</p>
      </div>
    );
  }

  const options = {
    title: `${xAxis} vs ${yAxis || 'Count'}`,
    titleTextStyle: {
      fontSize: 18,
      color: '#4B5563'
    },
    legend: { position: 'right' },
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    backgroundColor: 'transparent',
    hAxis: {
      title: xAxis,
      titleTextStyle: { color: '#4B5563' }
    },
    vAxis: {
      title: yAxis || 'Count',
      titleTextStyle: { color: '#4B5563' }
    },
    chartArea: { width: '80%', height: '70%' }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">Visualization</h2>
      <div className="h-96">
        <Chart
          chartType={chartType}
          width="100%"
          height="100%"
          data={chartData}
          options={options}
        />
      </div>
    </div>
  );
};

export default Visualization;