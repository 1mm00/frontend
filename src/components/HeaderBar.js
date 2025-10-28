import React from 'react';

const HeaderBar = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-2">
          <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-4">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold">Companies Directory</h1>
        </div>
        <p className="text-blue-100 text-lg">
          Browse through our comprehensive list of registered companies
        </p>
      </div>
    </div>
  );
};

export default HeaderBar;
