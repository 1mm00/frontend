import React from "react";
import { allCompanies } from "../data/mockCompanies";
import SidebarFilters from "./SidebarFilters";
import Pagination from "./Pagination";
import { usePaginatedData } from "../hooks/usePaginatedData";

const CompaniesPage = () => {
  const {
    currentPageData,
    filteredData,
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
  } = usePaginatedData(allCompanies, 25);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SidebarFilters
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              selectedType={selectedType}
              onTypeChange={handleTypeChange}
              selectedLetter={selectedLetter}
              onLetterChange={handleLetterChange}
              totalCompanies={allCompanies.length}
              filteredCompanies={filteredData}
              resetFilters={resetFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Companies Directory
                </h1>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    {totalItems} of {allCompanies.length} companies found
                  </div>
                  {(searchTerm ||
                    selectedType !== "All Types" ||
                    selectedLetter !== "All Letters") && (
                    <button
                      onClick={resetFilters}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Companies Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                {currentPageData.map((company) => (
                  <div
                    key={company.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                      {company.name}
                    </h3>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium">{company.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span
                          className={`font-medium ${
                            company.status === "Active"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {company.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span className="font-medium">{company.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalItems > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  itemsPerPage={itemsPerPage}
                  onItemsPerPageChange={handleItemsPerPageChange}
                  totalItems={totalItems}
                  startIndex={startIndex}
                  endIndex={endIndex}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;
