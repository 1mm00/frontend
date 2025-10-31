import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/company/${company.id}`);
  };
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {company.name}
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {company.type}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {company.category}
            </span>
          </div>
        </div>
      </div>
      sss
      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          <span>{company.status}</span>
        </div>
        <button 
          onClick={handleViewDetails}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
