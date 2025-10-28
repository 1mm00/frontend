import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Utility function to download CSV
export const downloadCSV = (companies, filename = 'companies.csv') => {
  const headers = ['ID', 'Company Name', 'Type', 'Status', 'Category'];
  const csvContent = [
    headers.join(','),
    ...companies.map(company => [
      company.id,
      `"${company.name}"`, // Wrap in quotes to handle commas in names
      company.type,
      company.status,
      company.category
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Utility function to download JSON
export const downloadJSON = (companies, filename = 'companies.json') => {
  const jsonContent = JSON.stringify(companies, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Utility function to download PDF
export const downloadPDF = (companies, filename = 'companies.pdf') => {
  try {
    const doc = new jsPDF();
    
    // Check if autoTable is available
    if (typeof doc.autoTable !== 'function') {
      console.error('jsPDF autoTable plugin not loaded properly');
      // Fallback to simple text-based PDF
      createSimplePDF(doc, companies, filename);
      return;
    }
    
    // Add title
    doc.setFontSize(20);
    doc.text('Companies Directory', 14, 22);
    
    // Add generation date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32);
    
    // Prepare table data
    const tableColumn = ['ID', 'Company Name', 'Type', 'Status', 'Category'];
    const tableRows = companies.map(company => [
      company.id,
      company.name,
      company.type,
      company.status,
      company.category
    ]);

    // Add table using autoTable
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'striped',
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      columnStyles: {
        0: { cellWidth: 15 }, // ID column
        1: { cellWidth: 80 }, // Company Name column
        2: { cellWidth: 25 }, // Type column
        3: { cellWidth: 20 }, // Status column
        4: { cellWidth: 35 }, // Category column
      },
    });

    // Add footer with total count
    const finalY = doc.lastAutoTable.finalY || 40;
    doc.setFontSize(10);
    doc.text(`Total Companies: ${companies.length}`, 14, finalY + 10);
    
    // Save the PDF
    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback to simple PDF
    const doc = new jsPDF();
    createSimplePDF(doc, companies, filename);
  }
};

// Fallback function for simple PDF without autoTable
const createSimplePDF = (doc, companies, filename) => {
  doc.setFontSize(20);
  doc.text('Companies Directory', 14, 22);
  
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32);
  doc.text(`Total Companies: ${companies.length}`, 14, 42);
  
  let yPosition = 60;
  doc.setFontSize(8);
  
  companies.slice(0, 50).forEach((company, index) => { // Limit to first 50 for simple layout
    if (yPosition > 280) { // Add new page if needed
      doc.addPage();
      yPosition = 20;
    }
    
    const text = `${company.id}. ${company.name} (${company.type}) - ${company.status} - ${company.category}`;
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 14, yPosition);
    yPosition += lines.length * 4 + 2;
  });
  
  if (companies.length > 50) {
    doc.text(`... and ${companies.length - 50} more companies`, 14, yPosition + 10);
  }
  
  doc.save(filename);
};
