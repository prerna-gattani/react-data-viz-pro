export const chartOptions = {
    LineChart: {
      curveType: 'function',
      legend: { position: 'bottom' }
    },
    BarChart: {
      legend: { position: 'none' }
    },
    PieChart: {
      pieHole: 0.4,
      is3D: true
    },
    // Add more chart-specific options as needed
  };
  
  export const getChartOptions = (chartType, xAxis, yAxis) => {
    const baseOptions = {
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
    
    return {
      ...baseOptions,
      ...(chartOptions[chartType] || {})
    };
  };