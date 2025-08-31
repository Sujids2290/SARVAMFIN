import React, { useState } from 'react';

const ChitFundCalculator = () => {
  const [inputs, setInputs] = useState({
    chitAmount: '',
    numberOfMonths: '',
    auctionPercentage: '',
    commissionRate: '3'
  });
  
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateChitFund = () => {
    const { chitAmount, numberOfMonths, auctionPercentage, commissionRate } = inputs;
    
    if (!chitAmount || !numberOfMonths || !auctionPercentage) {
      alert('Please fill all required fields');
      return;
    }

    const chit = parseFloat(chitAmount);
    const months = parseInt(numberOfMonths);
    const auctionRate = parseFloat(auctionPercentage);
    const commission = parseFloat(commissionRate);
    
    if (chit <= 0 || months <= 0 || auctionRate <= 0 || commission < 0) {
      alert('Please enter valid positive numbers');
      return;
    }

    // Formulas as specified
    const monthlyContribution = chit / months;
    const auctionDiscount = chit * (auctionRate / 100);
    const commissionAmount = chit * (commission / 100);
    const netDiscount = auctionDiscount - commissionAmount;
    const benefitPerMember = netDiscount / months;
    const monthlyPayable = monthlyContribution - benefitPerMember;

    setResults({
      monthlyContribution: monthlyContribution,
      auctionDiscount: auctionDiscount,
      commissionAmount: commissionAmount,
      netDiscount: netDiscount,
      benefitPerMember: benefitPerMember,
      monthlyPayable: monthlyPayable,
      chitAmount: chit,
      numberOfMonths: months,
      auctionPercentage: auctionRate,
      commissionRate: commission
    });
  };

  const resetCalculator = () => {
    setInputs({
      chitAmount: '',
      numberOfMonths: '',
      auctionPercentage: '',
      commissionRate: '3'
    });
    setResults(null);
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Auction Chit Fund Calculator</h2>
        <p className="text-gray-600">
          Calculate your chit fund benefits and monthly payables with our comprehensive calculator
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Input Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">Chit Fund Details</h3>
          
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
              <label htmlFor="auctionPercentage" className="block text-sm font-medium text-gray-700 mb-2">
                Auction Percentage (%) *
              </label>
              <input
                type="number"
                id="auctionPercentage"
                name="auctionPercentage"
                value={inputs.auctionPercentage}
                onChange={handleInputChange}
                className="custom-input"
                placeholder="e.g., 18"
                min="5"
                max="25"
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">Rate between 5% to 25%</p>
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
              <p className="text-xs text-gray-500 mt-1">Commission charged by the organizer</p>
            </div>
          </div>

          <div className="flex space-x-4 mt-8">
            <button
              onClick={calculateChitFund}
              className="btn-primary flex-1"
            >
              Calculate
            </button>
            <button
              onClick={resetCalculator}
              className="btn-secondary flex-1"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">Calculation Results</h3>
          
          {results ? (
            <div className="space-y-4">
              <div className="result-card">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-red-600 mb-2">
                    {formatCurrency(results.monthlyPayable)}
                  </div>
                  <div className="text-gray-600 font-medium">Monthly Payable (Auction Month)</div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="flex justify-between items-center">
                      <span className="text-red-600 font-semibold text-sm">Monthly Contribution (Before Discount)</span>
                      <span className="text-xl font-bold text-gray-900">{formatCurrency(results.monthlyContribution)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="flex justify-between items-center">
                      <span className="text-red-600 font-semibold text-sm">Auction Discount</span>
                      <span className="text-xl font-bold text-green-600">{formatCurrency(results.auctionDiscount)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="flex justify-between items-center">
                      <span className="text-red-600 font-semibold text-sm">Commission ({results.commissionRate}%)</span>
                      <span className="text-xl font-bold text-red-600">{formatCurrency(results.commissionAmount)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="flex justify-between items-center">
                      <span className="text-red-600 font-semibold text-sm">Net Discount Shared</span>
                      <span className="text-xl font-bold text-green-600">{formatCurrency(results.netDiscount)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="flex justify-between items-center">
                      <span className="text-red-600 font-semibold text-sm">Benefit per Member</span>
                      <span className="text-xl font-bold text-green-600">{formatCurrency(results.benefitPerMember)}</span>
                    </div>
                  </div>
                </div>

                {/* Chit Fund Breakdown */}
                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 mb-3">Chit Fund Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Chit Amount:</span>
                      <span className="font-semibold">{formatCurrency(results.chitAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold">{results.numberOfMonths} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Auction Rate:</span>
                      <span className="font-semibold">{results.auctionPercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Savings per Month:</span>
                      <span className="font-semibold text-green-600">{formatCurrency(results.benefitPerMember)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="result-card text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Enter Chit Fund Details</h4>
              <p className="text-gray-600">
                Fill in the chit fund details on the left to see your benefit calculation and monthly payable amount
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Example Calculation */}
      {!results && (
        <div className="mt-12 bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Example Calculation</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-red-600">Sample Input:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Chit Amount: ₹5,00,000</li>
                <li>• Number of Months: 20</li>
                <li>• Auction Percentage: 18%</li>
                <li>• Commission: 3%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-red-600">Expected Results:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Monthly Contribution: ₹25,000</li>
                <li>• Net Discount Shared: ₹75,000</li>
                <li>• Benefit per Member: ₹3,750</li>
                <li>• Monthly Payable: ₹21,250</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Understanding Chit Funds</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">What is a Chit Fund?</h4>
            <p>
              A chit fund is a traditional Indian savings scheme where a group of individuals contribute 
              a fixed amount monthly. Each month, the total collection is given to one member through 
              an auction process, providing both savings and credit facilities.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">How Does the Auction Work?</h4>
            <p>
              In the auction, members bid by offering to accept a lower amount than the total chit value. 
              The highest bidder (who accepts the lowest amount) wins the pot. The discount amount is 
              distributed among all members as a benefit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChitFundCalculator;