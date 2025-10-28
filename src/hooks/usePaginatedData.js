import { useState, useMemo } from 'react';

export const usePaginatedData = (data, initialItemsPerPage = 25) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedLetter, setSelectedLetterState] = useState('All Letters');

  // Filter data based on search criteria
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'All Types' || item.type === selectedType;
      const matchesLetter = selectedLetter === 'All Letters' || 
                           item.name.charAt(0).toUpperCase() === selectedLetter;
      
      return matchesSearch && matchesType && matchesLetter;
    });
  }, [data, searchTerm, selectedType, selectedLetter]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredData.length);

  // Get current page data
  const currentPageData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  const handleFilterChange = (filterType, value) => {
    setCurrentPage(1);
    switch (filterType) {
      case 'search':
        setSearchTerm(value);
        break;
      case 'type':
        setSelectedType(value);
        break;
      case 'letter':
        setSelectedLetterState(value);
        break;
      default:
        break;
    }
  };

  // Individual filter handlers
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
    setCurrentPage(1);
  };

  const handleLetterChange = (value) => {
    setSelectedLetterState(value);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('All Types');
    setSelectedLetterState('All Letters');
    setCurrentPage(1);
  };

  return {
    // Data
    currentPageData,
    filteredData,
    totalItems: filteredData.length,
    
    // Pagination state
    currentPage,
    totalPages,
    itemsPerPage,
    startIndex,
    endIndex,
    
    // Filter state
    searchTerm,
    selectedType,
    selectedLetter,
    
    // Handlers
    handlePageChange,
    handleItemsPerPageChange,
    handleFilterChange,
    resetFilters,
    
    // Individual filter setters (for backward compatibility)
    setSearchTerm: handleSearchChange,
    setSelectedType: handleTypeChange,
    setSelectedLetter: handleLetterChange,
  };
};
