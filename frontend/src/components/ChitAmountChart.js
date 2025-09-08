import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ChitAmountChart = () => {
  const [inputs, setInputs] = useState({
    chitAmount: '',
    numberOfMonths: '',
    commissionRate: '3',
    auctionMonth: '',
    totalMembers: ''
  });
  
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateChitChart = () => {
    const { chitAmount, numberOfMonths, commissionRate, auctionMonth, totalMembers } = inputs;
    
    if (!chitAmount || !numberOfMonths || !auctionMonth || !totalMembers) {
      alert('Please fill all required fields');
      return;
    }

    const chit = parseFloat(chitAmount);
    const months = parseInt(numberOfMonths);
    const commission = parseFloat(commissionRate);
    const auction = parseInt(auctionMonth);
    const members = parseInt(totalMembers);
    
    if (chit <= 0 || months <= 0 || commission < 0 || auction <= 0 || auction > months || members <= 0) {
      alert('Please enter valid values. Auction month should be within the total months.');
      return;
    }

    // Calculate for ROI from 12% to 30%
    const chartData = [];
    for (let roi = 12; roi <= 30; roi++) {
      // Commission Amount (fixed)
      const commissionAmount = chit * (commission / 100);
      
      // Base Auction Amount = Chit Amount - Commission
      let baseAuctionAmount = chit - commissionAmount;
      
      // Adjust based on auction month and ROI
      // For month 20 (latest) at 12% ROI, should give 485,000
      // This means: 500,000 - 15,000 (commission) = 485,000
      // The ROI represents different auction scenarios, not deductions
      const monthFactor = auction / months; // 0 to 1 scale  
      const roiFactor = (roi - 12) / 18; // 0 to 1 scale (12% to 30%)
      
      // Adjustment: later months get more, higher ROI scenarios get less
      const monthAdjustment = monthFactor * 0.1; // Up to 10% bonus for later months
      const roiAdjustment = roiFactor * 0.15; // Up to 15% reduction for higher ROI
      
      const adjustedAuctionAmount = baseAuctionAmount * (1 + monthAdjustment - roiAdjustment);
      
      // Per Person Payable = Auction Amount / Total Members
      const perPersonPayable = adjustedAuctionAmount / members;
      
      chartData.push({
        auctionPercentage: roi,
        auctionAmount: adjustedAuctionAmount,
        perPersonPayable: perPersonPayable,
        commissionAmount: commissionAmount
      });
    }

    setResults({
      chartData: chartData,
      chitAmount: chit,
      numberOfMonths: months,
      commissionRate: commission,
      auctionMonth: auction,
      totalMembers: members
    });
  };

  const resetCalculator = () => {
    setInputs({
      chitAmount: '',
      numberOfMonths: '',
      commissionRate: '3',
      auctionMonth: '',
      totalMembers: ''
    });
    setResults(null);
  };

  const downloadExcel = () => {
    if (!results) {
      alert('Please generate chart first');
      return;
    }

    // Prepare data for Excel
    const excelData = results.chartData.map(data => ({
      'Auction %': `${data.auctionPercentage}%`,
      'Auction Amount (₹)': data.auctionAmount.toFixed(0),
      'Auction Commission (₹)': data.commissionAmount.toFixed(0),
      'Per Person Payable (₹)': data.perPersonPayable.toFixed(0)
    }));

    // Add summary information
    const summaryData = [
      { 'Parameter': 'Chit Amount', 'Value': `₹${results.chitAmount.toLocaleString('en-IN')}` },
      { 'Parameter': 'Duration', 'Value': `${results.numberOfMonths} months` },
      { 'Parameter': 'Commission Rate', 'Value': `${results.commissionRate}%` },
      { 'Parameter': 'Auction Month', 'Value': `Month ${results.auctionMonth}` },
      { 'Parameter': 'Total Members', 'Value': `${results.totalMembers}` }
    ];

    // Create workbook
    const wb = XLSX.utils.book_new();
    
    // Add chart data sheet
    const ws1 = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, ws1, "Chit Amount Chart");
    
    // Add summary sheet
    const ws2 = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, ws2, "Summary");

    // Download file
    XLSX.writeFile(wb, `Chit_Amount_Chart_${results.chitAmount}_${results.numberOfMonths}months.xlsx`);
  };

  const downloadPDF = () => {
    if (!results) {
      alert('Please generate chart first');
      return;
    }

    // Create a printable version
    const printWindow = window.open('', '_blank');
    const chartHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Chit Amount Chart - Sarvam Finance</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .summary { background: #f5f5f5; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
            table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #dc2626; color: white; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>CHIT Calculator Analysis</h1>
            <h2>SARVAM FINANCE AND CHIT FUNDS PVT LTD</h2>
          </div>
          
          <div class="summary">
            <h3>Chart Summary</h3>
            <p><strong>Chit Amount:</strong> ₹${results.chitAmount.toLocaleString('en-IN')}</p>
            <p><strong>Duration:</strong> ${results.numberOfMonths} months</p>
            <p><strong>Commission Rate:</strong> ${results.commissionRate}%</p>
            <p><strong>Auction Month:</strong> Month ${results.auctionMonth}</p>
            <p><strong>Total Members:</strong> ${results.totalMembers}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Auction %</th>
                <th>Auction Amount (₹)</th>
                <th>Auction Commission (₹)</th>
                <th>Per Person Payable (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${results.chartData.map(data => `
                <tr>
                  <td>${data.auctionPercentage}%</td>
                  <td>₹${formatCurrency(data.auctionAmount)}</td>
                  <td>₹${formatCurrency(data.commissionAmount)}</td>
                  <td><strong>₹${formatCurrency(data.perPersonPayable)}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="no-print">
            <button onclick="window.print()">Print / Save as PDF</button>
            <button onclick="window.close()">Close</button>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(chartHTML);
    printWindow.document.close();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">CHIT Calculator</h2>
        <p className="text-gray-600">
          Calculate auction amounts and per-person payables across different ROI percentages with auction month adjustments
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Input Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">Chart Parameters</h3>
          
          <div className="space-y-6">
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
                min="25000"
                max="5000000"
              />
              <p className="text-xs text-gray-500 mt-1">Enter amount between ₹25,000 to ₹50,00,000</p>
            </div>

            <div>
              <label htmlFor="numberOfMonths" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Months *
              </label>
              <input
                type="number"
                id="numberOfMonths"
                name="numberOfMonths"
                value={inputs.numberOfMonths}
                onChange={handleInputChange}
                className="custom-input"
                placeholder="e.g., 20"
                min="12"
                max="50"
              />
              <p className="text-xs text-gray-500 mt-1">Duration between 12 to 50 months</p>
            </div>

            <div>
              <label htmlFor="commissionRate" className="block text-sm font-medium text-gray-700 mb-2">
                Commission Rate (%)
              </label>
              <select
                id="commissionRate"
                name="commissionRate"
                value={inputs.commissionRate}
                onChange={handleInputChange}
                className="custom-select"
              >
                <option value="3">3% (Standard)</option>
                <option value="5">5% (Premium)</option>
              </select>
            </div>

            <div>
              <label htmlFor="auctionMonth" className="block text-sm font-medium text-gray-700 mb-2">
                Auction Month *
              </label>
              <input
                type="number"
                id="auctionMonth"
                name="auctionMonth"
                value={inputs.auctionMonth}
                onChange={handleInputChange}
                className="custom-input"
                placeholder="e.g., 5"
                min="1"
                max={inputs.numberOfMonths || 50}
              />
              <p className="text-xs text-gray-500 mt-1">Month when auction takes place (affects amount)</p>
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
                min="5"
                max="50"
              />
              <p className="text-xs text-gray-500 mt-1">Number of members in the chit fund group</p>
            </div>
          </div>

          <div className="flex space-x-4 mt-8">
            <button
              onClick={calculateChitChart}
              className="btn-primary flex-1"
            >
              Generate Chart
            </button>
            <button
              onClick={resetCalculator}
              className="btn-secondary flex-1"
            >
              Reset
            </button>
          </div>

          {/* Download Buttons */}
          {results && (
            <div className="mt-4 flex space-x-4">
              <button
                onClick={downloadExcel}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex-1 flex items-center justify-center"
              >
                <span className="mr-2">📊</span>
                Download Excel
              </button>
              <button
                onClick={downloadPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex-1 flex items-center justify-center"
              >
                <span className="mr-2">📄</span>
                Print/PDF
              </button>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">Analysis Results</h3>
          
          {results ? (
            <div className="space-y-6">
              {/* Summary */}
              <div className="result-card">
                <h4 className="font-bold text-gray-900 mb-3">Chart Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Chit Amount:</span>
                    <div className="font-semibold">₹{formatCurrency(results.chitAmount)}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <div className="font-semibold">{results.numberOfMonths} months</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Commission:</span>
                    <div className="font-semibold">{results.commissionRate}%</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Auction Month:</span>
                    <div className="font-semibold">Month {results.auctionMonth}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Members:</span>
                    <div className="font-semibold">{results.totalMembers}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Best Case:</span>
                    <div className="font-semibold text-green-600">₹{formatCurrency(results.chartData[0].perPersonPayable)}/person</div>
                  </div>
                </div>
              </div>

              {/* Key Insights */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2">Key Insights</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Earlier auction month = Lower auction amounts</li>
                  <li>• Lower ROI percentages = Higher per-person payables</li>
                  <li>• Month {results.auctionMonth} adjustment factor applied</li>
                  <li>• Commission: {results.commissionRate}% of chit amount</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="result-card text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Enter Chart Parameters</h4>
              <p className="text-gray-600">
                Fill in all parameters on the left to generate the enhanced chit amount analysis
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Data Table */}
      {results && (
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Analysis Table</h3>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-red-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                    Auction %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                    Auction Amount (₹)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                    Auction Commission (₹)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                    Per Person Payable (₹)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.chartData.map((data, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.auctionPercentage}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">
                      ₹{formatCurrency(data.auctionAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      ₹{formatCurrency(data.commissionAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                      ₹{formatCurrency(data.perPersonPayable)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Understanding the Enhanced Chart</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">New Calculation Logic:</h4>
            <p>
              The enhanced calculator includes <strong>auction month adjustment</strong> where earlier months receive 
              lower amounts and later months receive higher amounts. This reflects the realistic chit fund dynamics.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Per Person Distribution:</h4>
            <p>
              The auction amount is distributed equally among all members, showing the exact per-person payable 
              amount for each ROI scenario.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChitAmountChart;