import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';

const FileUpload = ({ setFileData, setColumns }) => {
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      if (file.name.endsWith('.csv')) {
        Papa.parse(event.target.result, {
          header: true,
          complete: (results) => {
            processData(results.data, results.meta.fields);
          },
        });
      } else if (file.name.endsWith('.json')) {
        try {
          const jsonData = JSON.parse(event.target.result);
          if (Array.isArray(jsonData) && jsonData.length > 0) {
            const columns = Object.keys(jsonData[0]);
            processData(jsonData, columns);
          }
        } catch (error) {
          alert('Invalid JSON file');
        }
      }
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  const processData = (data, columns) => {
    // Filter out empty rows
    const filteredData = data.filter(row => {
      return Object.values(row).some(val => val !== null && val !== undefined && val !== '');
    });
    
    setFileData(filteredData);
    setColumns(columns);
    navigate('/dashboard');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json']
    },
    maxFiles: 1
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-2">
        <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        {isDragActive ? (
          <p className="text-blue-600 font-medium">Drop the file here...</p>
        ) : (
          <>
            <p className="text-gray-600">Drag & drop a CSV or JSON file here, or click to select</p>
            <p className="text-sm text-gray-500">Supports: .csv, .json</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;