import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EMICalculator from './EMICalculator';
import ChitFundCalculator from './ChitFundCalculator';
import ChitAmountChart from './ChitAmountChart';

const CalculatorsPage = () => {
  const [activeCalculator, setActiveCalculator] = useState('emi');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to handle calculator switching with scroll to top
  const handleCalculatorSwitch = (calculatorType) => {
    setActiveCalculator(calculatorType);
    // Scroll to calculators section smoothly
    setTimeout(() => {
      const calculatorSection = document.querySelector('.max-w-4xl');
      if (calculatorSection) {
        calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_project-merger/artifacts/tpuz0zal_Sarvam%20Logo%20%282%29.pdf.png" 
                alt="Sarvam Finance Logo" 
                className="h-12 w-auto mr-3"
              />
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">SARVAM FINANCE</h1>
                <p className="text-xs text-gray-600 leading-tight">& CHIT FUNDS PVT LTD</p>
              </div>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Home
              </Link>
              <span className="text-red-600 font-medium">Finance Calculators</span>
            </nav>
            
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Finance Calculators
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plan your finances better with our professional calculators. Calculate EMIs, 
            chit fund returns, and make informed financial decisions.
          </p>
        </div>

        {/* Calculator Selection */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-2 shadow-md">
            <div className="flex space-x-2">
              <button
                onClick={() => handleCalculatorSwitch('emi')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeCalculator === 'emi'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                EMI Calculator
              </button>
              <button
                onClick={() => handleCalculatorSwitch('chitfund')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeCalculator === 'chitfund'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Chit Fund Calculator
              </button>
              <button
                onClick={() => handleCalculatorSwitch('chitchart')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeCalculator === 'chitchart'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Chit Amount Chart
              </button>
            </div>
          </div>
        </div>

        {/* Calculator Components */}
        <div className="max-w-4xl mx-auto">
          {activeCalculator === 'emi' && <EMICalculator />}
          {activeCalculator === 'chitfund' && <ChitFundCalculator />}
          {activeCalculator === 'chitchart' && <ChitAmountChart />}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Financial Guidance?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our expert team is here to help you make the best financial decisions. 
              Contact us for personalized advice and solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📞</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm">04324-233844</p>
              <p className="text-gray-600 text-sm">8940448844</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📍</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm">13, Chairman Ramanujam Street, Karur</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">✉️</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm">dhinesh@sarvamgroups.in</p>
              <p className="text-gray-600 text-sm">info@sarvamgroups.in</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/" className="btn-primary">
              Explore Our Services
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <img 
                src="https://customer-assets.emergentagent.com/job_project-merger/artifacts/bd15rkvw_sarvam%20%281%29.png" 
                alt="Sarvam Finance Logo" 
                className="h-32 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-4">
              © 2024 SARVAM FINANCE AND CHITFUNDS PVT LTD. All rights reserved.
            </p>
            <div className="text-red-400 font-semibold">
              Built on Trust for the past 13 years
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CalculatorsPage;