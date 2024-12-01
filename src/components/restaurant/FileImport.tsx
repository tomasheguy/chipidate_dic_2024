import React, { useCallback } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';

interface FileImportProps {
  onFileSelect: (content: string) => void;
  accept: string;
  description: string;
}

const FileImport: React.FC<FileImportProps> = ({ onFileSelect, accept, description }) => {
  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        onFileSelect(JSON.stringify({ items: jsonData }));
      } else if (file.name.endsWith('.csv')) {
        const text = await file.text();
        onFileSelect(text);
      } else {
        const text = await file.text();
        onFileSelect(text);
      }
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Error reading file. Please check the format and try again.');
    }
  }, [onFileSelect]);

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
      <div className="flex flex-col items-center text-center">
        <Upload className="w-12 h-12 text-gray-400 mb-4" />
        <label className="cursor-pointer">
          <span className="mt-2 block text-sm font-medium text-gray-900">
            Drop your file here, or{' '}
            <span className="text-blue-600 hover:text-blue-500">browse</span>
          </span>
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
          />
        </label>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
        
        <div className="mt-4 flex items-center text-sm text-gray-600">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span>Supported formats: {accept}</span>
        </div>
      </div>
    </div>
  );
};

export default FileImport;