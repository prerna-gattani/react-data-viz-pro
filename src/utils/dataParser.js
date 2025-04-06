export const parseCSV = (csvString) => {
    // This is already handled by PapaParse in FileUpload component
    return [];
  };
  
  export const parseJSON = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return null;
    }
  };
  
  export const filterData = (data, filters) => {
    if (!filters || Object.keys(filters).length === 0) return data;
    
    return data.filter(row => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return String(row[key]).toLowerCase().includes(value.toLowerCase());
      });
    });
  };