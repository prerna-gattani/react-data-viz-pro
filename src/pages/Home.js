import FileUpload from '../components/FileUpload';

const Home = ({ setFileData, setColumns }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">DataViz Pro</h1>
        <p className="text-gray-600 mb-8 text-center">
          Upload your CSV or JSON file to generate automated visualizations
        </p>
        <FileUpload setFileData={setFileData} setColumns={setColumns} />
      </div>
    </div>
  );
};

export default Home;