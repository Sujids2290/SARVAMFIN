import React, { useState } from 'react';

const EMICalculator = () => {
  const [inputs, setInputs] = useState({
    loanAmount: '',
    interestRate: '',
    tenure: ''
  });
  
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateEMI = () => {
    const { loanAmount, interestRate, tenure } = inputs;
    
    if (!loanAmount || !interestRate || !tenure) {
      alert('Please fill all fields');
      return;
    }

    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const n = parseInt(tenure);
    
    if (P <= 0 || annualRate <= 0 || n <= 0) {
      alert('Please enter valid positive numbers');
      return;
    }

    // Monthly interest rate
    const r = annualRate / 12 / 100;
    
    // EMI calculation using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1)
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    setResults({
      emi: emi,
      totalInterest: totalInterest,
      totalAmount: totalAmount,
      principal: P
    });
  };

  const resetCalculator = () => {
    setInputs({
      loanAmount: '',
      interestRate: '',
      tenure: ''
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">EMI Calculator</h2>
        <p className="text-gray-600">
          Calculate your Equated Monthly Installment (EMI) for loans with our easy-to-use calculator
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Input Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">Loan Details</h3>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount (₹) *
              </label>
              <input
                type="number"
                id="loanAmount"
                name="loanAmount"
                value={inputs.loanAmount}
                onChange={handleInputChange}
                className="custom-input"
                placeholder="e.g., 500000"
                min="1000"
                max="10000000"
              />
              <p className="text-xs text-gray-500 mt-1">Enter amount between ₹1,000 to ₹1,00,00,000</p>
            </div>

            <div>
              <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-2">
                Annual Interest Rate (%) *
              </label>
              <input
                type="number"
                id="interestRate"
                name="interestRate"
                value={inputs.interestRate}
                onChange={handleInputChange}
                className="custom-input"
                placeholder="e.g., 12.5"
                min="1"
                max="30"
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">Rate between 1% to 30% per annum</p>
            </div>

            <div>
              <label htmlFor="tenure" className="block text-sm font-medium text-gray-700 mb-2">
                Loan Tenure (Months) *
              </label>
              <input
                type="number"
                id="tenure"
                name="tenure"
                value={inputs.tenure}
                onChange={handleInputChange}
                className="custom-input"
                placeholder="e.g., 24"
                min="1"
                max="360"
              />
              <p className="text-xs text-gray-500 mt-1">Tenure between 1 to 360 months</p>
            </div>
          </div>

          <div className="flex space-x-4 mt-8">
            <button
              onClick={calculateEMI}
              className="btn-primary flex-1"
            >
              Calculate EMI
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
                    {formatCurrency(results.emi)}
                  </div>
                  <div className="text-gray-600 font-medium">Monthly EMI</div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="text-red-600 font-semibold text-sm mb-1">Principal Amount</div>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(results.principal)}</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="text-red-600 font-semibold text-sm mb-1">Total Interest</div>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(results.totalInterest)}</div>
                  </div>
                </div>
                
                <div className="mt-4 bg-white rounded-lg p-4 border border-red-200">
                  <div className="text-red-600 font-semibold text-sm mb-1">Total Amount Payable</div>
                  <div className="text-3xl font-bold text-gray-900">{formatCurrency(results.totalAmount)}</div>
                </div>

                {/* Loan Breakdown Chart */}
                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 mb-3">Loan Breakdown</h4>
                  <div className="flex rounded-lg overflow-hidden h-8">
                    <div 
                      className="bg-red-500 flex items-center justify-center text-white text-xs font-semibold"
                      style={{width: `${(results.principal / results.totalAmount) * 100}%`}}
                    >
                      Principal
                    </div>
                    <div 
                      className="bg-red-300 flex items-center justify-center text-white text-xs font-semibold"
                      style={{width: `${(results.totalInterest / results.totalAmount) * 100}%`}}
                    >
                      Interest
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>Principal: {((results.principal / results.totalAmount) * 100).toFixed(1)}%</span>
                    <span>Interest: {((results.totalInterest / results.totalAmount) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="result-card text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Enter Loan Details</h4>
              <p className="text-gray-600">
                Fill in the loan details on the left to see your EMI calculation and payment breakdown
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Understanding EMI</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">What is EMI?</h4>
            <p>
              Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender 
              at a specified date each calendar month. EMIs are used to pay off both interest and principal 
              each month so that over a specified number of years, the loan is paid off in full.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">How is EMI Calculated?</h4>
            <p>
              EMI is calculated using the formula: EMI = [P × R × (1+R)^N] / [(1+R)^N-1], 
              where P is the principal loan amount, R is the monthly interest rate, and N is the number of monthly installments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;