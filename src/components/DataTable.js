const DataTable = ({ data, columns }) => {
    if (!data || data.length === 0) return null;
  
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Data Preview</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col, index) => (
                  <th 
                    key={index} 
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.slice(0, 5).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td 
                      key={colIndex} 
                      className="px-4 py-2 whitespace-nowrap text-sm text-gray-500"
                    >
                      {row[col] !== undefined ? String(row[col]) : ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {data.length > 5 && (
            <p className="text-sm text-gray-500 mt-2">Showing 5 of {data.length} rows</p>
          )}
        </div>
      </div>
    );
  };
  
  export default DataTable;