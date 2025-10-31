// components/SidebarFilters.js
import React, { useState, useEffect } from "react";
import { companyTypes } from "../data/mockCompanies";
import { downloadCSV, downloadJSON, downloadPDF } from "../utils/downloadUtils";

const alphabetLetters = [
  "All Letters",
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
];

const SidebarFilters = ({
  searchTerm = "",
  onSearchChange,
  selectedType = "All Types",
  onTypeChange,
  selectedLetter = "All Letters",
  onLetterChange,
  totalCompanies = 0,
  filteredCompanies = [],
  resetFilters,
}) => {
  // États locaux
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [localType, setLocalType] = useState(selectedType);
  const [localLetter, setLocalLetter] = useState(selectedLetter);

  // Synchroniser avec les props
  useEffect(() => setLocalSearch(searchTerm), [searchTerm]);
  useEffect(() => setLocalType(selectedType), [selectedType]);
  useEffect(() => setLocalLetter(selectedLetter), [selectedLetter]);

  const handleLocalSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearchChange && onSearchChange(value); // pass value directly
  };

  const handleLocalTypeChange = (e) => {
    const value = e.target.value;
    setLocalType(value);
    onTypeChange && onTypeChange(value);
  };

  const handleLocalLetterChange = (e) => {
    const value = e.target.value;
    setLocalLetter(value);
    onLetterChange && onLetterChange(value);
  };

  const handleResetClick = () => {
    setLocalSearch("");
    setLocalType("All Types");
    setLocalLetter("All Letters");
    resetFilters && resetFilters(); // parent should also reset
  };

  // Download handlers
  const handleDownloadPDF = () =>
    downloadPDF(filteredCompanies, "companies-directory.pdf");
  const handleDownloadCSV = () =>
    downloadCSV(filteredCompanies, "companies-directory.csv");
  const handleDownloadJSON = () =>
    downloadJSON(filteredCompanies, "companies-directory.json");

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      {/* Filters Section */}
      <div>
        <div className="flex items-center justify-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            value={localSearch}
            onChange={handleLocalSearchChange}
            placeholder="Company name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Company Type Select */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Type
          </label>
          <select
            value={localType}
            onChange={handleLocalTypeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {companyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Letter Filter Select */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Starts With Letter
          </label>
          <select
            value={localLetter}
            onChange={handleLocalLetterChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {alphabetLetters.map((letter) => (
              <option key={letter} value={letter}>
                {letter}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {(localSearch ||
          localType !== "All Types" ||
          localLetter !== "All Letters") && (
          <div className="mt-4">
            <button
              onClick={handleResetClick}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0 a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Export Data Section */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-center mb-4">
          <svg
            className="w-5 h-5 text-gray-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586 a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900">Export Data</h3>
        </div>
        <div className="space-y-2">
          <button
            onClick={handleDownloadPDF}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center"
          >
            Download PDF
          </button>
          <button
            onClick={handleDownloadCSV}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center"
          >
            Download CSV
          </button>
          <button
            onClick={handleDownloadJSON}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center"
          >
            Download JSON
          </button>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {totalCompanies.toLocaleString()}
            </div>
            <div className="text-sm text-blue-800">Total Companies</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {filteredCompanies.length.toLocaleString()}
            </div>
            <div className="text-sm text-green-800">Filtered Results</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {totalCompanies > 0
                ? Math.round((filteredCompanies.length / totalCompanies) * 100)
                : 0}
              %
            </div>
            <div className="text-sm text-purple-800">Match Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;
