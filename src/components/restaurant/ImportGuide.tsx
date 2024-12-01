import React from 'react';
import { FileText } from 'lucide-react';

interface ImportGuideProps {
  type: 'menu' | 'table';
}

const ImportGuide: React.FC<ImportGuideProps> = ({ type }) => {
  const menuFormat = `{
  "menus": [
    {
      "name": "Summer Tasting Menu",
      "description": "5-course seasonal menu",
      "startDate": "2024-06-01",
      "endDate": "2024-08-31",
      "price": 120,
      "discountedPrice": 89,
      "items": [
        {
          "name": "Chilled Gazpacho",
          "description": "With cucumber foam",
          "type": "starter",
          "price": 18
        }
      ]
    }
  ]
}`;

  const tableFormat = `{
  "tables": [
    {
      "name": "Table 1",
      "seats": 4,
      "location": "Main Room"
    }
  ]
}`;

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-blue-600" />
        File Format Guide
      </h3>
      
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Your {type} file should follow this JSON structure:
        </p>
        
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-md text-sm overflow-x-auto">
          {type === 'menu' ? menuFormat : tableFormat}
        </pre>
        
        <div className="text-sm text-gray-600">
          <p className="font-medium mb-2">Important notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>All dates should be in YYYY-MM-DD format</li>
            <li>Prices should be numbers without currency symbols</li>
            {type === 'menu' && (
              <>
                <li>Menu items must specify type: starter, main, dessert, or beverage</li>
                <li>Discounted price must be lower than regular price</li>
              </>
            )}
            {type === 'table' && (
              <>
                <li>Table names must be unique</li>
                <li>Seats must be a positive number</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImportGuide;