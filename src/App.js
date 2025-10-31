import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderBar from './components/HeaderBar';
import SidebarFilters from './components/SidebarFilters';
import CompanyCard from './components/CompanyCard';
import CompanyDetails from './components/CompanyDetails';
import Pagination from './components/Pagination';
import { allCompanies } from './data/mockCompanies';
import { usePaginatedData } from './hooks/usePaginatedData';
import './App.css';

const CompaniesList = () => {
  const {
    currentPageData: currentCompanies,
    filteredData: filteredCompanies,
    totalItems,
    currentPage,
    totalPages,
    itemsPerPage,
    startIndex,
    endIndex,
    searchTerm,
    selectedType,
    selectedLetter,
    handlePageChange,
    handleItemsPerPageChange,
    handleSearchChange,
    handleTypeChange,
    handleLetterChange,
    resetFilters,
  } = usePaginatedData(allCompanies, 10);

  // Wrap handlePageChange to add smooth scrolling
  const handlePageChangeWithScroll = (page) => {
    handlePageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <div className="lg:w-80 flex-shrink-0">
        <SidebarFilters
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
          selectedLetter={selectedLetter}
          onLetterChange={handleLetterChange}
          totalCompanies={allCompanies.length}
          filteredCompanies={filteredCompanies}
          resetFilters={resetFilters}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Results Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Companies Directory
              </h2>
              <p className="text-gray-600">
                Showing {startIndex}–{endIndex} of {filteredCompanies.length.toLocaleString()} companies
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <label htmlFor="itemsPerPage" className="text-sm text-gray-700">
                Show:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Company Cards */}
        {currentCompanies.length > 0 ? (
          <div className="space-y-4 mb-8">
            {currentCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-1.01-6-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredCompanies.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChangeWithScroll}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            totalItems={filteredCompanies.length}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        )}
      </div>
    </div>
  );
};

function App() {
  const {
    currentPageData: currentCompanies,
    filteredData: filteredCompanies,
    totalItems,
    currentPage,
    totalPages,
    itemsPerPage,
    startIndex,
    endIndex,
    searchTerm,
    selectedType,
    selectedLetter,
    handlePageChange,
    handleItemsPerPageChange,
    handleSearchChange,
    handleTypeChange,
    handleLetterChange,
    resetFilters,
  } = usePaginatedData(allCompanies, 10);

  // Wrap handlePageChange to add smooth scrolling
  const handlePageChangeWithScroll = (page) => {
    handlePageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <HeaderBar />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<CompaniesList />} />
            <Route path="/company/:id" element={<CompanyDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
