import React, { useState } from 'react';

const ChitAmountChart = () => {
  const [inputs, setInputs] = useState({
    chitAmount: '',
    numberOfMonths: '',
    commissionRate: '3',
    auctionMonth: ''
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
    const { chitAmount, numberOfMonths, commissionRate, auctionMonth } = inputs;
    
    if (!chitAmount || !numberOfMonths || !auctionMonth) {
      alert('Please fill all required fields');
      return;
    }

    const chit = parseFloat(chitAmount);
    const months = parseInt(numberOfMonths);
    const commission = parseFloat(commissionRate);
    const auction = parseInt(auctionMonth);
    
    if (chit <= 0 || months <= 0 || commission < 0 || auction <= 0 || auction > months) {
      alert('Please enter valid values. Auction month should be within the total months.');
      return;
    }

    // Calculate for ROI from 12% to 30%
    const chartData = [];
    for (let roi = 12; roi <= 30; roi++) {
      const auctionDiscount = chit * (roi / 100);
      const commissionAmount = chit * (commission / 100);
      const chitAmountCustomerGets = chit - auctionDiscount - commissionAmount;
      
      chartData.push({
        roi: roi,
        auctionDiscount: auctionDiscount,
        commissionAmount: commissionAmount,
        chitAmountCustomerGets: chitAmountCustomerGets
      });
    }

    setResults({
      chartData: chartData,
      chitAmount: chit,
      numberOfMonths: months,
      commissionRate: commission,
      auctionMonth: auction
    });
  };

  const resetCalculator = () => {
    setInputs({
      chitAmount: '',
      numberOfMonths: '',
      commissionRate: '3',
      auctionMonth: ''
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

  const getBarHeight = (value, maxValue) => {
    return (value / maxValue) * 200; // Max height of 200px
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Chit Amount Chart</h2>
        <p className="text-gray-600">
          Analyze chit fund returns across different ROI percentages to make informed decisions
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
              <p className="text-xs text-gray-500 mt-1">Month when auction takes place</p>
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
                    <div className="font-semibold">{formatCurrency(results.chitAmount)}</div>
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
                </div>
              </div>

              {/* Bar Chart */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-4">ROI vs Amount Customer Gets</h4>
                <div className="flex items-end justify-between space-x-1 h-64 overflow-x-auto">
                  {results.chartData.map((data, index) => {
                    const maxValue = Math.max(...results.chartData.map(d => d.chitAmountCustomerGets));
                    const height = getBarHeight(data.chitAmountCustomerGets, maxValue);
                    
                    return (
                      <div key={index} className="flex flex-col items-center min-w-[40px]">
                        <div className="mb-2 text-xs text-gray-600 transform -rotate-45 origin-bottom-left">
                          {formatCurrency(data.chitAmountCustomerGets)}
                        </div>
                        <div
                          className="bg-red-500 hover:bg-red-600 transition-colors duration-200 w-8 rounded-t cursor-pointer"
                          style={{ height: `${height}px` }}
                          title={`ROI: ${data.roi}% - Amount: ${formatCurrency(data.chitAmountCustomerGets)}`}
                        ></div>
                        <div className="mt-2 text-xs font-semibold text-gray-700">
                          {data.roi}%
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-center mt-2 text-xs text-gray-500">
                  ROI Percentage (Hover bars for exact values)
                </div>
              </div>
            </div>
          ) : (
            <div className="result-card text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Enter Chart Parameters</h4>
              <p className="text-gray-600">
                Fill in the parameters on the left to generate ROI analysis chart
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Data Table */}
      {results && (
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed ROI Analysis Table</h3>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-red-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                    ROI %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                    Auction Discount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                    Commission ({results.commissionRate}%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                    Amount Customer Gets
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.chartData.map((data, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.roi}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      {formatCurrency(data.auctionDiscount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      {formatCurrency(data.commissionAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      {formatCurrency(data.chitAmountCustomerGets)}
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
        <h3 className="text-lg font-bold text-gray-900 mb-4">Understanding the Chart</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">How to Read the Chart:</h4>
            <p>
              The chart shows how the amount you receive decreases as the ROI (auction percentage) increases. 
              Higher ROI means higher auction discount, resulting in less money for the customer.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Key Insights:</h4>
            <p>
              Lower ROI percentages are better for customers as they result in higher chit amounts. 
              The commission remains constant regardless of ROI, making it a fixed cost in your calculation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChitAmountChart;