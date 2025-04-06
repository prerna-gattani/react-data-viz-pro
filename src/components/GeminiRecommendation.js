import { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const GeminiRecommendation = ({ data, columns, setSelectedChart, setXAxis, setYAxis }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);

  const getGeminiRecommendation = async () => {
    if (!data || data.length === 0) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // UNSAFE: API key exposed in frontend code
      const API_KEY = 'AIzaSyAAAEBU9iArR9sBbK1QJV5nSCHav02qPQ8'; // Replace with your actual API key
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Analyze this dataset and recommend the best visualization type and axes to use.
                Respond in JSON format with these fields:
                - recommendedChart (LineChart, BarChart, PieChart, etc.)
                - recommendedXAxis (column name)
                - recommendedYAxis (column name)
                - reasoning (brief explanation)
                
                Dataset columns: ${columns.join(', ')}
                Sample data: ${JSON.stringify(data.slice(0, 3))}`
              }]
            }]
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      
      // Extract the JSON response from Gemini's text response
      const responseText = result.candidates[0].content.parts[0].text;
      const jsonStart = responseText.indexOf('{');
      const jsonEnd = responseText.lastIndexOf('}') + 1;
      const jsonResponse = JSON.parse(responseText.slice(jsonStart, jsonEnd));
      
      setRecommendation({
        chartType: jsonResponse.recommendedChart,
        xAxis: jsonResponse.recommendedXAxis,
        yAxis: jsonResponse.recommendedYAxis,
        reasoning: jsonResponse.reasoning
      });
      
      // Apply the recommendation
      setSelectedChart(jsonResponse.recommendedChart);
      setXAxis(jsonResponse.recommendedXAxis);
      setYAxis(jsonResponse.recommendedYAxis);
      
    } catch (err) {
      setError('Failed to get recommendation. Please try again.');
      console.error('Gemini API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3 text-gray-700 flex items-center">
        <InfoIcon className="text-blue-500 mr-2" />
        AI Chart Recommendation
      </h2>
      
      <Button
        variant="contained"
        color="primary"
        onClick={getGeminiRecommendation}
        disabled={isLoading}
        fullWidth
        className="mb-3"
      >
        {isLoading ? (
          <>
            <CircularProgress size={24} color="inherit" className="mr-2" />
            Analyzing...
          </>
        ) : (
          'Get AI Recommendation'
        )}
      </Button>
      
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      
      {recommendation && !error && (
        <div className="mt-3 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-gray-700">{recommendation.reasoning}</p>
          <div className="mt-2 text-sm">
            <span className="font-medium">Chart Type:</span> {recommendation.chartType}
          </div>
          <div className="text-sm">
            <span className="font-medium">X-Axis:</span> {recommendation.xAxis}
          </div>
          {recommendation.chartType !== 'PieChart' && (
            <div className="text-sm">
              <span className="font-medium">Y-Axis:</span> {recommendation.yAxis}
            </div>
          )}
        </div>
      )}
      
      <p className="text-xs text-gray-500 mt-2">
        Note: This implementation exposes API keys in client-side code. For production use, implement a backend service.
      </p>
    </div>
  );
};

export default GeminiRecommendation;