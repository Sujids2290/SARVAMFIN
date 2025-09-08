import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ChitCalculator = () => {
  const [inputs, setInputs] = useState({
    chitAmount: '',
    months: '',
    commissionRate: '3',
    auctionAmount: '',
    totalMembers: ''
  });
  
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate results whenever inputs change
  useEffect(() => {
    const { chitAmount, months, commissionRate, auctionAmount, totalMembers } = inputs;
    
    if (chitAmount && months && commissionRate && auctionAmount && totalMembers) {
      const chit = parseFloat(chitAmount);
      const monthsNum = parseInt(months);
      const commission = parseFloat(commissionRate);
      const auction = parseFloat(auctionAmount);
      const members = parseInt(totalMembers);
      
      if (chit > 0 && monthsNum > 0 && commission >= 0 && auction >= 0 && members > 0) {
        const calculatedResults = [];
        
        // Generate results for Auction Percentage from 12% to 30%
        for (let auctionPct = 12; auctionPct <= 30; auctionPct++) {
          const commissionAmount = chit * commission / 100;
          const auctionAmountCalc = chit * auctionPct / 100;
          const perPersonPayable = (chit - auctionAmountCalc - commissionAmount) / members;
          
          calculatedResults.push({
            auctionPercentage: auctionPct,
            commission: commissionAmount,
            auctionAmount: auctionAmountCalc,
            perPersonPayable: perPersonPayable
          });
        }
        
        setResults(calculatedResults);
      } else {
        setResults([]);
      }
    } else {
      setResults([]);
    }
  }, [inputs]);

  const resetCalculator = () => {
    setInputs({
      chitAmount: '',
      months: '',
      commissionRate: '3',
      auctionAmount: '',
      totalMembers: ''
    });
    setResults([]);
  };

  const downloadExcel = () => {
    if (results.length === 0) {
      alert('Please fill all fields to generate results first');
      return;
    }

    // Prepare data for Excel
    const excelData = results.map(row => ({
      'Auction Percentage': `${row.auctionPercentage}%`,
      'Commission (₹)': Math.round(row.commission),
      'Auction Amount (₹)': Math.round(row.auctionAmount),
      'Per Person Payable (₹)': Math.round(row.perPersonPayable)
    }));

    // Add summary information
    const summaryData = [
      { 'Parameter': 'Chit Amount', 'Value': `₹${parseFloat(inputs.chitAmount).toLocaleString('en-IN')}` },
      { 'Parameter': 'Duration', 'Value': `${inputs.months} months` },
      { 'Parameter': 'Commission Rate', 'Value': `${inputs.commissionRate}%` },
      { 'Parameter': 'Auction Amount Input', 'Value': `₹${parseFloat(inputs.auctionAmount).toLocaleString('en-IN')}` },
      { 'Parameter': 'Total Members', 'Value': `${inputs.totalMembers}` }
    ];

    // Create workbook
    const wb = XLSX.utils.book_new();
    
    // Add results data sheet
    const ws1 = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, ws1, "Chit Calculator Results");
    
    // Add summary sheet
    const ws2 = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, ws2, "Input Summary");

    // Download file
    XLSX.writeFile(wb, `Chit_Calculator_${inputs.chitAmount}_${inputs.months}months.xlsx`);
  };

  const downloadPDF = () => {
    if (results.length === 0) {
      alert('Please fill all fields to generate results first');
      return;
    }

    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text('Chit Amount Chart Calculator', 20, 25);
    
    // Add company name
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text('SARVAM FINANCE AND CHIT FUNDS PVT LTD', 20, 35);
    
    // Add input summary
    doc.setFontSize(10);
    doc.setTextColor(60);
    doc.text(`Chit Amount: ₹${parseFloat(inputs.chitAmount).toLocaleString('en-IN')}`, 20, 50);
    doc.text(`Duration: ${inputs.months} months`, 20, 58);
    doc.text(`Commission Rate: ${inputs.commissionRate}%`, 20, 66);
    doc.text(`Auction Amount Input: ₹${parseFloat(inputs.auctionAmount).toLocaleString('en-IN')}`, 20, 74);
    doc.text(`Total Members: ${inputs.totalMembers}`, 20, 82);
    
    // Prepare table data
    const tableData = results.map(row => [
      `${row.auctionPercentage}%`,
      `₹${Math.round(row.commission).toLocaleString('en-IN')}`,
      `₹${Math.round(row.auctionAmount).toLocaleString('en-IN')}`,
      `₹${Math.round(row.perPersonPayable).toLocaleString('en-IN')}`
    ]);
    
    // Add table
    doc.autoTable({
      head: [['Auction Percentage', 'Commission (₹)', 'Auction Amount (₹)', 'Per Person Payable (₹)']],
      body: tableData,
      startY: 95,
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [220, 38, 38], // Red color
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251], // Light gray
      },
      margin: { top: 95, left: 20, right: 20 },
    });
    
    // Save the PDF
    doc.save(`Chit_Calculator_${inputs.chitAmount}_${inputs.months}months.pdf`);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Chit Amount Chart Calculator</h2>
        <p className="text-gray-600">
          Calculate chit fund returns across different auction percentages with precise calculations
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Input Parameters</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label htmlFor="chitAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Chit Amount (₹) *
            </label>
            <input
              type="number"
              id="chitAmount"
              name="chitAmount"
              value={inputs.chitAmount}
              onChange={handleInputChange}
              className="custom-input"
              placeholder="e.g., 500000"
              min="1000"
            />
          </div>

          <div>
            <label htmlFor="months" className="block text-sm font-medium text-gray-700 mb-2">
              No of Months *
            </label>
            <input
              type="number"
              id="months"
              name="months"
              value={inputs.months}
              onChange={handleInputChange}
              className="custom-input"
              placeholder="e.g., 20"
              min="1"
              max="100"
            />
          </div>

          <div>
            <label htmlFor="commissionRate" className="block text-sm font-medium text-gray-700 mb-2">
              Commission Rate (%) *
            </label>
            <input
              type="number"
              id="commissionRate"
              name="commissionRate"
              value={inputs.commissionRate}
              onChange={handleInputChange}
              className="custom-input"
              placeholder="e.g., 3"
              min="0"
              max="50"
              step="0.1"
            />
          </div>

          <div>
            <label htmlFor="auctionAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Auction Amount (₹) *
            </label>
            <input
              type="number"
              id="auctionAmount"
              name="auctionAmount"
              value={inputs.auctionAmount}
              onChange={handleInputChange}
              className="custom-input"
              placeholder="e.g., 60000"
              min="0"
            />
          </div>

          <div>
            <label htmlFor="totalMembers" className="block text-sm font-medium text-gray-700 mb-2">
              Total Members *
            </label>
            <input
              type="number"
              id="totalMembers"
              name="totalMembers"
              value={inputs.totalMembers}
              onChange={handleInputChange}
              className="custom-input"
              placeholder="e.g., 20"
              min="1"
              max="100"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={resetCalculator}
              className="btn-secondary w-full"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Results Table */}
      {results.length > 0 ? (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Results Table</h3>
          <div className="overflow-x-auto bg-white rounded-lg shadow border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-red-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider border-r border-gray-200">
                    Auction Percentage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider border-r border-gray-200">
                    Commission (₹)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider border-r border-gray-200">
                    Auction Amount (₹)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                    Per Person Payable (₹)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                      {row.auctionPercentage}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold border-r border-gray-200">
                      ₹{formatCurrency(row.commission)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold border-r border-gray-200">
                      ₹{formatCurrency(row.auctionAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                      ₹{formatCurrency(row.perPersonPayable)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Download Buttons */}
          <div className="flex space-x-4 mt-6 justify-end">
            <button
              onClick={downloadPDF}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center"
            >
              <span className="mr-2">📄</span>
              Download as PDF
            </button>
            <button
              onClick={downloadExcel}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center"
            >
              <span className="mr-2">📊</span>
              Download as Excel
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">📊</div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Enter All Parameters</h4>
          <p className="text-gray-600">
            Fill in all required fields above to generate the chit amount chart with calculations for auction percentages from 12% to 30%
          </p>
        </div>
      )}

      {/* Formula Information */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Calculation Formula</h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p><strong>Commission:</strong> Chit Amount × Commission Rate ÷ 100</p>
          <p><strong>Auction Amount:</strong> Chit Amount × Auction Percentage ÷ 100</p>
          <p><strong>Per Person Payable:</strong> (Chit Amount - Auction Amount - Commission) ÷ Total Members</p>
          <p className="mt-3 text-blue-600"><strong>Note:</strong> The table shows calculations for auction percentages from 12% to 30%, incrementing by 1%.</p>
        </div>
      </div>
    </div>
  );
};

export default ChitCalculator;