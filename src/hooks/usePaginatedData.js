import { useState, useMemo } from "react";

export const usePaginatedData = (data, initialItemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedLetter, setSelectedLetter] = useState("All Letters");

  // Filtering data
  const filteredData = useMemo(() => {
    return data.filter((company) => {
      // Search term filter (case insensitive)
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = company.name.toLowerCase().includes(searchLower);
      
      // Type filter (case sensitive exact match)
      const matchesType = selectedType === "All Types" || company.type === selectedType;
      
      // Letter filter (case insensitive first letter match)
      const matchesLetter = 
        selectedLetter === "All Letters" || 
        (company.name && company.name.length > 0 && 
         company.name[0].toUpperCase() === selectedLetter.toUpperCase());

      return matchesSearch && matchesType && matchesLetter;
    });
  }, [data, searchTerm, selectedType, selectedLetter]);

  // Pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentPageData = filteredData.slice(startIndex, endIndex);

  // Handlers
  const handlePageChange = (page) => setCurrentPage(page);
  const handleItemsPerPageChange = (value) => {
    // Handle both direct value and event object
    const newValue = typeof value === 'object' ? Number(value.target.value) : Number(value);
    setItemsPerPage(newValue);
    setCurrentPage(1);
  };
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  const handleTypeChange = (value) => {
    setSelectedType(value);
    setCurrentPage(1);
  };
  const handleLetterChange = (value) => {
    setSelectedLetter(value);
    setCurrentPage(1);
  };
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("All Types");
    setSelectedLetter("All Letters");
    setCurrentPage(1);
  };

  return {
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
  };
};
