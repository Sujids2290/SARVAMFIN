import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ChitCalculator = () => {
  const [inputs, setInputs] = useState({
    chitAmount: '',
    commission: '5',
    totalMonths: '',
    currentMonth: '',
    bidAmount: '',
    bidInterest: ''
  });
  
  const [calculationMode, setCalculationMode] = useState('bidAmount'); // 'bidAmount' or 'bidInterest'
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleModeChange = (mode) => {
    setCalculationMode(mode);
    setResults(null);
  };

  // Calculate results whenever inputs change
  useEffect(() => {
    const { chitAmount, commission, totalMonths, currentMonth, bidAmount, bidInterest } = inputs;
    
    if (chitAmount && commission && totalMonths && currentMonth) {
      const chit = parseFloat(chitAmount);
      const comm = parseFloat(commission);
      const totalM = parseInt(totalMonths);
      const currentM = parseInt(currentMonth);
      
      if (chit > 0 && comm >= 0 && totalM > 0 && currentM > 0 && currentM <= totalM) {
        let calculatedResults = {};
        
        const commissionAmount = (comm / 100) * chit;
        const originalInstallment = chit / totalM;
        const remainingMonths = totalM - currentM;
        
        if (calculationMode === 'bidAmount' && bidInterest) {
          // Calculate Bid Amount from Bid Interest
          const rate = parseFloat(bidInterest);
          if (rate > 0 && remainingMonths > 0) {
            const bidAmt = (rate * chit * remainingMonths) / (12 * 100 + rate * remainingMonths);
            const biddingRate = ((bidAmt + commissionAmount) * 12 * 100) / ((chit - bidAmt - commissionAmount) * remainingMonths);
            const bidderGet = Math.max(0, chit - bidAmt - commissionAmount);
            const dividendPerPerson = bidAmt / totalM;
            const payableInstallment = originalInstallment - dividendPerPerson;
            const monthlySavings = originalInstallment > 0 ? (dividendPerPerson / originalInstallment) * 100 : 0;
            
            calculatedResults = {
              bidAmount: bidAmt,
              biddingRate: biddingRate,
              bidderGet: bidderGet,
              originalInstallment: originalInstallment,
              dividendPerPerson: dividendPerPerson,
              payableInstallment: payableInstallment,
              monthlySavings: monthlySavings,
              chitCommission: commissionAmount
            };
          }
        } else if (calculationMode === 'bidInterest' && bidAmount) {
          // Calculate Bidding Rate from Bid Amount
          const bidAmt = parseFloat(bidAmount);
          if (bidAmt >= 0 && bidAmt < chit && remainingMonths > 0) {
            const biddingRate = ((bidAmt + commissionAmount) * 12 * 100) / ((chit - bidAmt - commissionAmount) * remainingMonths);
            const bidderGet = Math.max(0, chit - bidAmt - commissionAmount);
            const dividendPerPerson = bidAmt / totalM;
            const payableInstallment = originalInstallment - dividendPerPerson;
            const monthlySavings = originalInstallment > 0 ? (dividendPerPerson / originalInstallment) * 100 : 0;
            
            calculatedResults = {
              bidAmount: bidAmt,
              biddingRate: biddingRate,
              bidderGet: bidderGet,
              originalInstallment: originalInstallment,
              dividendPerPerson: dividendPerPerson,
              payableInstallment: payableInstallment,
              monthlySavings: monthlySavings,
              chitCommission: commissionAmount
            };
          }
        }
        
        setResults(calculatedResults);
      } else {
        setResults(null);
      }
    } else {
      setResults(null);
    }
  }, [inputs, calculationMode]);

  const resetCalculator = () => {
    setInputs({
      chitAmount: '',
      commission: '5',
      totalMonths: '',
      currentMonth: '',
      bidAmount: '',
      bidInterest: ''
    });
    setResults(null);
  };

  const downloadExcel = () => {
    if (!results) {
      alert('Please fill all required fields to generate results first');
      return;
    }

    // Prepare data for Excel
    const excelData = [
      { 'Parameter': 'Chit Amount', 'Value': `₹${parseFloat(inputs.chitAmount).toLocaleString('en-IN')}` },
      { 'Parameter': 'Commission', 'Value': `${inputs.commission}%` },
      { 'Parameter': 'Total Months', 'Value': inputs.totalMonths },
      { 'Parameter': 'Current Month', 'Value': inputs.currentMonth },
      { 'Parameter': '', 'Value': '' },
      { 'Parameter': 'Bidding Rate', 'Value': `${results.biddingRate ? results.biddingRate.toFixed(2) : '0.00'}%` },
      { 'Parameter': 'Bid Amount', 'Value': `₹${Math.round(results.bidAmount || 0).toLocaleString('en-IN')}` },
      { 'Parameter': 'Bidder Gets', 'Value': `₹${Math.round(results.bidderGet || 0).toLocaleString('en-IN')}` },
      { 'Parameter': '', 'Value': '' },
      { 'Parameter': 'Original Installment', 'Value': `₹${Math.round(results.originalInstallment || 0).toLocaleString('en-IN')}` },
      { 'Parameter': 'Dividend per Person', 'Value': `₹${Math.round(results.dividendPerPerson || 0).toLocaleString('en-IN')}` },
      { 'Parameter': 'Payable Installment', 'Value': `₹${Math.round(results.payableInstallment || 0).toLocaleString('en-IN')}` },
      { 'Parameter': 'Monthly Savings', 'Value': `${results.monthlySavings ? results.monthlySavings.toFixed(2) : '0.00'}%` },
      { 'Parameter': 'Chit Commission', 'Value': `₹${Math.round(results.chitCommission || 0).toLocaleString('en-IN')}` }
    ];

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, ws, "Chit Fund Results");

    // Download file
    XLSX.writeFile(wb, `Chit_Fund_Calculator_₹${inputs.chitAmount}.xlsx`);
  };

  const downloadPDF = () => {
    if (!results) {
      alert('Please fill all required fields to generate results first');
      return;
    }

    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text('Chit Fund Calculator', 20, 25);
    
    // Add company name
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text('SARVAM FINANCE AND CHIT FUNDS PVT LTD', 20, 35);
    
    // Add input summary
    doc.setFontSize(10);
    doc.setTextColor(60);
    doc.text(`Chit Amount: ₹${parseFloat(inputs.chitAmount).toLocaleString('en-IN')}`, 20, 50);
    doc.text(`Commission: ${inputs.commission}%`, 20, 58);
    doc.text(`Total Months: ${inputs.totalMonths}`, 20, 66);
    doc.text(`Current Month: ${inputs.currentMonth}`, 20, 74);
    
    // Add results
    doc.setFontSize(12);
    doc.setTextColor(40);
    doc.text('Results:', 20, 90);
    
    doc.setFontSize(10);
    doc.setTextColor(60);
    doc.text(`Bidding Rate: ${results.biddingRate ? results.biddingRate.toFixed(2) : '0.00'}%`, 20, 105);
    doc.text(`Bid Amount: ₹${Math.round(results.bidAmount || 0).toLocaleString('en-IN')}`, 20, 113);
    doc.text(`Bidder Gets: ₹${Math.round(results.bidderGet || 0).toLocaleString('en-IN')}`, 20, 121);
    doc.text(`Original Installment: ₹${Math.round(results.originalInstallment || 0).toLocaleString('en-IN')}`, 20, 135);
    doc.text(`Dividend per Person: ₹${Math.round(results.dividendPerPerson || 0).toLocaleString('en-IN')}`, 20, 143);
    doc.text(`Payable Installment: ₹${Math.round(results.payableInstallment || 0).toLocaleString('en-IN')}`, 20, 151);
    doc.text(`Monthly Savings: ${results.monthlySavings ? results.monthlySavings.toFixed(2) : '0.00'}%`, 20, 159);
    doc.text(`Chit Commission: ₹${Math.round(results.chitCommission || 0).toLocaleString('en-IN')}`, 20, 167);
    
    // Save the PDF
    doc.save(`Chit_Fund_Calculator_${inputs.chitAmount}.pdf`);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Chit Fund Calculator</h2>
        <p className="text-gray-600">
          Calculate bidding rates, bid amounts, and monthly returns for chit fund auctions
        </p>
      </div>

      {/* Input Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Chit Details */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Chit Details</h3>
          
          <div className="space-y-4">
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
                placeholder="e.g., 200000"
                min="1000"
              />
            </div>

            <div>
              <label htmlFor="commission" className="block text-sm font-medium text-gray-700 mb-2">
                Commission (%) *
              </label>
              <input
                type="number"
                id="commission"
                name="commission"
                value={inputs.commission}
                onChange={handleInputChange}
                className="custom-input"
                placeholder="e.g., 5"
                min="0"
                max="20"
                step="0.1"
              />
            </div>

            <div>
              <label htmlFor="totalMonths" className="block text-sm font-medium text-gray-700 mb-2">
                Total Months *
              </label>
              <input
                type="number"
                id="totalMonths"
                name="totalMonths"
                value={inputs.totalMonths}
                onChange={handleInputChange}
                className="custom-input"
                placeholder="e.g., 20"
                min="6"
                max="100"
              />
            </div>

            <div>
              <label htmlFor="currentMonth" className="block text-sm font-medium text-gray-700 mb-2">
                Current Month *
              </label>
              <input
                type="number"
                id="currentMonth"
                name="currentMonth"
                value={inputs.currentMonth}
                onChange={handleInputChange}
                className="custom-input"
                placeholder="e.g., 5"
                min="1"
                max={inputs.totalMonths || 100}
              />
            </div>
          </div>
        </div>

        {/* Auction Details */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Auction</h3>
          
          {/* Mode Selection */}
          <div className="mb-4">
            <div className="flex space-x-2 bg-white rounded-lg p-1">
              <button
                onClick={() => handleModeChange('bidAmount')}
                className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  calculationMode === 'bidAmount'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Calculate Bid Amount
              </button>
              <button
                onClick={() => handleModeChange('bidInterest')}
                className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  calculationMode === 'bidInterest'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Calculate Bid Interest
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {calculationMode === 'bidAmount' ? (
              <div>
                <label htmlFor="bidInterest" className="block text-sm font-medium text-gray-700 mb-2">
                  Bid Interest (%) *
                </label>
                <input
                  type="number"
                  id="bidInterest"
                  name="bidInterest"
                  value={inputs.bidInterest}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="e.g., 20"
                  min="1"
                  max="50"
                  step="0.1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the annual interest rate to calculate the bid amount
                </p>
              </div>
            ) : (
              <div>
                <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  Bid Amount (₹) *
                </label>
                <input
                  type="number"
                  id="bidAmount"
                  name="bidAmount"
                  value={inputs.bidAmount}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="e.g., 40000"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Bid amount and commission is deducted from Chit Amount to get the amount payable to the auction winner
                </p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={resetCalculator}
              className="btn-secondary w-full"
            >
              Reset Calculator
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {results ? (
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Bidder Results */}
          <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <h3 className="text-lg font-bold text-red-800 mb-4">Bidder</h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-red-600">Bidding Rate</div>
                <div className="text-2xl font-bold text-red-800">{results.biddingRate ? results.biddingRate.toFixed(2) : '0.00'}%</div>
              </div>
              <div>
                <div className="text-sm text-red-600">Bidder Gets</div>
                <div className="text-xl font-bold text-red-800">{formatCurrency(results.bidderGet || 0)}</div>
              </div>
              <div>
                <div className="text-sm text-red-600">Bid Amount</div>
                <div className="text-lg font-semibold text-red-700">{formatCurrency(results.bidAmount || 0)}</div>
              </div>
            </div>
          </div>

          {/* Other Members Results */}
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-bold text-green-800 mb-4">Other Members</h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-green-600">Original Installment</div>
                <div className="text-lg font-semibold text-green-800">{formatCurrency(results.originalInstallment || 0)}</div>
              </div>
              <div>
                <div className="text-sm text-green-600">Dividend per Person</div>
                <div className="text-lg font-semibold text-green-800">{formatCurrency(results.dividendPerPerson || 0)}</div>
              </div>
              <div>
                <div className="text-sm text-green-600">Payable Installment</div>
                <div className="text-xl font-bold text-green-800">{formatCurrency(results.payableInstallment || 0)}</div>
              </div>
              <div>
                <div className="text-sm text-green-600">Monthly Savings</div>
                <div className="text-2xl font-bold text-green-800">{results.monthlySavings ? results.monthlySavings.toFixed(2) : '0.00'}%</div>
              </div>
            </div>
          </div>

          {/* Manager Results */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-blue-800 mb-4">Manager</h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-blue-600">Chit Commission</div>
                <div className="text-2xl font-bold text-blue-800">{formatCurrency(results.chitCommission || 0)}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg mb-8">
          <div className="text-6xl mb-4">📊</div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Enter Chit Fund Details</h4>
          <p className="text-gray-600">
            Fill in all required fields above to calculate bidding rates, bid amounts, and monthly returns
          </p>
        </div>
      )}

      {/* Download Buttons */}
      {results && (
        <div className="flex space-x-4 justify-end mb-8">
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
      )}

      {/* Formulas Information */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Formulas Used</h3>
        <div className="text-sm text-gray-700 space-y-3">
          <div>
            <p><strong>Bidding Rate (annualized):</strong></p>
            <p className="font-mono text-xs bg-white p-2 rounded border mt-1">
              ((Bid Amount + Commission) × 12 × 100) ÷ ((Chit Amount – Bid Amount – Commission) × (Total Months – Current Month))
            </p>
          </div>
          <div>
            <p><strong>Bid Amount:</strong></p>
            <p className="font-mono text-xs bg-white p-2 rounded border mt-1">
              (rate × Chit Amount × (Total Months – Current Month)) ÷ (12 × 100 + rate × (Total Months – Current Month))
            </p>
          </div>
          <div>
            <p><strong>Other Calculations:</strong></p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Original installment = Chit Amount ÷ Total Months</li>
              <li>Commission = Commission % × Chit Amount</li>
              <li>Dividend per person = Bid Amount ÷ Total Members</li>
              <li>Payable Installment = Original Installment – Dividend per person</li>
              <li>Monthly Savings = (Dividend per person ÷ Original Installment) × 100%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChitCalculator;