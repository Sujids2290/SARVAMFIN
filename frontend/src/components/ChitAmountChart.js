import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const ChitAmountChart = () => {
  const [inputs, setInputs] = useState({
    chitAmount: '',
    months: '',
    commissionPct: '3',
    auctionMonth: '',
    members: ''
  });
  
  const [results, setResults] = useState(null);
  const [headerStats, setHeaderStats] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate header stats whenever inputs change
  useEffect(() => {
    const { chitAmount, months, commissionPct } = inputs;
    
    if (chitAmount && months && commissionPct) {
      const chit = parseFloat(chitAmount);
      const monthsNum = parseInt(months);
      const commission = parseFloat(commissionPct);
      
      if (chit > 0 && monthsNum >= 2 && commission >= 0) {
        const perInstallment = chit / monthsNum;
        const commissionAmount = chit * commission / 100;
        const maxPayableToWinner = chit - commissionAmount;
        
        setHeaderStats({
          perInstallment,
          commissionAmount,
          maxPayableToWinner
        });
      } else {
        setHeaderStats(null);
      }
    } else {
      setHeaderStats(null);
    }
  }, [inputs.chitAmount, inputs.months, inputs.commissionPct]);

  const calculateAuctionAmount = (chitAmount, months, commissionPct, auctionMonth, auctionPct) => {
    // Define variables
    const I = chitAmount / months; // monthly installment
    const r = Math.pow(1 + (auctionPct / 100), 1/12) - 1; // monthly ROI rate
    const k = auctionMonth;
    const n = months;
    
    // Calculate summations using the exact formula
    let S_before = 0;
    for (let j = 1; j <= k - 1; j++) {
      S_before += Math.pow(1 + r, k - j); // Growth from month j to month k
    }
    
    let S_after = 0;
    for (let j = k + 1; j <= n; j++) {
      S_after += Math.pow(1 + r, k - j); // Discount from month j to month k
    }
    
    // Auction Amount at month k using the cash flow approach
    let P = I * (S_before + 1 + S_after);
    
    // Apply cap and guards
    const commission = chitAmount * commissionPct / 100;
    const maxPayable = chitAmount - commission;
    P = Math.min(P, maxPayable);
    
    if (P < 0) P = 0;
    
    // Round to nearest rupee
    return Math.round(P);
  };

  const calculateChitChart = () => {
    const { chitAmount, months, commissionPct, auctionMonth, members } = inputs;
    
    if (!chitAmount || !months || !auctionMonth || !members) {
      alert('Please fill all required fields');
      return;
    }

    const chit = parseFloat(chitAmount);
    const monthsNum = parseInt(months);
    const commission = parseFloat(commissionPct);
    const auction = parseInt(auctionMonth);
    const membersNum = parseInt(members);
    
    if (chit <= 0 || monthsNum < 2 || commission < 0 || auction <= 0 || auction > monthsNum || membersNum < 2) {
      alert('Please enter valid values. Months and Members must be ≥ 2. Auction month should be within the total months.');
      return;
    }

    // Calculate for Auction % from 12% to 30%
    const chartData = [];
    for (let auctionPct = 12; auctionPct <= 30; auctionPct++) {
      const auctionAmount = calculateAuctionAmount(chit, monthsNum, commission, auction, auctionPct);
      const commissionAmount = chit * commission / 100;
      const perPersonPayable = auctionAmount / membersNum;
      
      chartData.push({
        auctionPercentage: auctionPct,
        auctionAmount: auctionAmount,
        commissionAmount: commissionAmount,
        perPersonPayable: perPersonPayable
      });
    }

    setResults({
      chartData: chartData,
      chitAmount: chit,
      months: monthsNum,
      commissionPct: commission,
      auctionMonth: auction,
      members: membersNum
    });
  };

  const resetCalculator = () => {
    setInputs({
      chitAmount: '',
      months: '',
      commissionPct: '3',
      auctionMonth: '',
      members: ''
    });
    setResults(null);
    setHeaderStats(null);
  };

  const downloadExcel = () => {
    if (!results) {
      alert('Please generate chart first');
      return;
    }

    // Prepare data for Excel
    const excelData = results.chartData.map(data => ({
      'Auction %': `${data.auctionPercentage}%`,
      'Auction Amount (₹)': data.auctionAmount,
      'Auction Commission (₹)': data.commissionAmount,
      'Per Person Payable (₹)': Math.round(data.perPersonPayable)
    }));

    // Add summary information
    const summaryData = [
      { 'Parameter': 'Chit Amount', 'Value': `₹${results.chitAmount.toLocaleString('en-IN')}` },
      { 'Parameter': 'Duration', 'Value': `${results.months} months` },
      { 'Parameter': 'Commission Rate', 'Value': `${results.commissionPct}%` },
      { 'Parameter': 'Auction Month', 'Value': `Month ${results.auctionMonth}` },
      { 'Parameter': 'Total Members', 'Value': `${results.members}` }
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
    XLSX.writeFile(wb, `Chit_Amount_Chart_${results.chitAmount}_Month${results.auctionMonth}.xlsx`);
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
          <title>Chit Amount Chart Calculator - Sarvam Finance</title>
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
            <h1>Chit Amount Chart Calculator</h1>
            <h2>SARVAM FINANCE AND CHIT FUNDS PVT LTD</h2>
          </div>
          
          <div class="summary">
            <h3>Chart Summary</h3>
            <p><strong>Chit Amount:</strong> ₹${results.chitAmount.toLocaleString('en-IN')}</p>
            <p><strong>Duration:</strong> ${results.months} months</p>
            <p><strong>Commission Rate:</strong> ${results.commissionPct}%</p>
            <p><strong>Auction Month:</strong> Month ${results.auctionMonth}</p>
            <p><strong>Total Members:</strong> ${results.members}</p>
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Chit Amount Chart Calculator</h2>
        <p className="text-gray-600">
          Calculate precise auction amounts based on auction month and ROI percentages using advanced financial modeling
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
              No. of Months *
            </label>
            <input
              type="number"
              id="months"
              name="months"
              value={inputs.months}
              onChange={handleInputChange}
              className="custom-input"
              placeholder="e.g., 20"
              min="2"
              max="100"
            />
          </div>

          <div>
            <label htmlFor="commissionPct" className="block text-sm font-medium text-gray-700 mb-2">
              Commission Rate (%)
            </label>
            <select
              id="commissionPct"
              name="commissionPct"
              value={inputs.commissionPct}
              onChange={handleInputChange}
              className="custom-select"
            >
              <option value="3">3% (Standard)</option>
              <option value="5">5% (Premium)</option>
              <option value="4">4%</option>
              <option value="2">2%</option>
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
              placeholder="e.g., 1"
              min="1"
              max={inputs.months || 100}
            />
          </div>

          <div>
            <label htmlFor="members" className="block text-sm font-medium text-gray-700 mb-2">
              Total Members *
            </label>
            <input
              type="number"
              id="members"
              name="members"
              value={inputs.members}
              onChange={handleInputChange}
              className="custom-input"
              placeholder="e.g., 20"
              min="2"
              max="100"
            />
          </div>

          <div className="flex items-end">
            <div className="flex space-x-3 w-full">
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
          </div>
        </div>
      </div>

      {/* Header Stats */}
      {headerStats && (
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Header Stats (Fixed)</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">₹{formatCurrency(headerStats.perInstallment)}</div>
              <div className="text-sm text-gray-600">Per-Installment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">₹{formatCurrency(headerStats.commissionAmount)}</div>
              <div className="text-sm text-gray-600">Commission</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">₹{formatCurrency(headerStats.maxPayableToWinner)}</div>
              <div className="text-sm text-gray-600">Max Payable to Winner</div>
            </div>
          </div>
        </div>
      )}

      {/* Download Buttons */}
      {results && (
        <div className="flex space-x-4 mb-8">
          <button
            onClick={downloadExcel}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center"
          >
            <span className="mr-2">📊</span>
            Download Excel
          </button>
          <button
            onClick={downloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center"
          >
            <span className="mr-2">📄</span>
            Print/PDF
          </button>
        </div>
      )}

      {/* Results Table */}
      {results ? (
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
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">📊</div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Enter All Parameters</h4>
          <p className="text-gray-600">
            Fill in all required fields to generate the chit amount chart with precise calculations
          </p>
        </div>
      )}

      {/* Formula Information */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Calculation Method</h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p><strong>Formula:</strong> P = I × (S_before + 1 + S_after)</p>
          <p><strong>Where:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>I = Monthly Installment (Chit Amount ÷ Months)</li>
            <li>r = Monthly ROI Rate = (1 + Auction%)^(1/12) - 1</li>
            <li>S_before = Sum of growth factors for past months</li>
            <li>S_after = Sum of discount factors for future months</li>
          </ul>
          <p className="mt-3"><strong>Applied Cap:</strong> Min(Calculated Amount, Chit Amount - Commission)</p>
        </div>
      </div>
    </div>
  );
};

export default ChitAmountChart;