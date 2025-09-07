import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoansSection = () => {
  const [selectedLoan, setSelectedLoan] = useState(0);

  const loanTypes = [
    {
      title: "Short Term Loans",
      duration: "Up to 12 months",
      rate: "From 12% per annum",
      description: "Quick financial solutions for your immediate needs with flexible repayment options.",
      features: ["Quick approval within 24 hours", "Minimal documentation", "Flexible repayment", "Competitive rates"],
      icon: "⚡"
    },
    {
      title: "Mortgage Loans",
      duration: "Up to 10 years",
      rate: "From 12% per annum",
      description: "Secure your dream property with our comprehensive mortgage loan solutions.",
      features: ["Long tenure up to 10 years", "Property valuation support", "Legal assistance", "Transparent process"],
      icon: "🏠"
    },
    {
      title: "Hire Purchase Loans",
      duration: "Up to 5 years",
      rate: "From 12% per annum",
      description: "Finance your vehicle or equipment purchases with our hire purchase loans.",
      features: ["Vehicle & equipment financing", "Easy EMI options", "Quick processing", "Doorstep service"],
      icon: "🚗"
    },
    {
      title: "Gold Loans",
      duration: "Up to 12 months",
      rate: "From 12% per annum",
      description: "Unlock the value of your gold with our secure and transparent gold loan services in Karur.",
      features: ["Instant approval", "Safe gold storage", "Flexible repayment", "No hidden charges"],
      icon: "💰"
    }
  ];

  const scrollToCalculators = () => {
    window.open('/calculators', '_blank');
  };

  return (
    <section id="loans" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Loan Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive loan services tailored to meet your financial needs. 
            From quick <strong>Karur gold loans</strong> to long-term mortgage solutions.
          </p>
        </div>

        {/* Loan Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {loanTypes.map((loan, index) => (
            <div 
              key={index}
              className={`card-shadow rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                selectedLoan === index ? 'bg-red-50 border-2 border-red-500' : 'bg-white border-2 border-transparent'
              }`}
              onClick={() => setSelectedLoan(index)}
            >
              <div className="text-4xl mb-4">{loan.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{loan.title}</h3>
              <div className="text-red-600 font-semibold mb-2">{loan.rate}</div>
              <div className="text-gray-600 text-sm mb-4">{loan.duration}</div>
              <p className="text-gray-700 text-sm">{loan.description}</p>
            </div>
          ))}
        </div>

        {/* Selected Loan Details */}
        <div className="bg-white rounded-xl card-shadow p-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {loanTypes[selectedLoan].title}
              </h3>
              <p className="text-gray-700 mb-6 text-lg">
                {loanTypes[selectedLoan].description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-red-600 font-semibold">Interest Rate</div>
                  <div className="text-2xl font-bold text-gray-900">{loanTypes[selectedLoan].rate}</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-red-600 font-semibold">Max Duration</div>
                  <div className="text-2xl font-bold text-gray-900">{loanTypes[selectedLoan].duration}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/calculators"
                  className="btn-primary text-center"
                >
                  Calculate EMI
                </Link>
                <button 
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-secondary"
                >
                  Apply Now
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Key Features</h4>
              <ul className="space-y-3">
                {loanTypes[selectedLoan].features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxmaW5hbmNpYWwlMjBzZXJ2aWNlc3xlbnwwfHx8fDE3NTY2NDUwNDF8MA&ixlib=rb-4.1.0&q=85"
                  alt="Professional Financial Consultation"
                  className="rounded-lg w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 bg-white rounded-xl card-shadow p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Loan Services in Karur?</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-4">
                At Sarvam Finance, we understand the unique financial needs of Karur residents and businesses. 
                Our <strong>Karur gold loan</strong> services offer the fastest approval process with competitive rates, 
                making us the preferred choice for immediate financial assistance.
              </p>
              <p className="text-gray-700">
                Whether you need short-term funding or long-term mortgage solutions, our experienced team 
                provides personalized service with complete transparency and no hidden charges.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Our Commitment:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Fastest loan approval in Karur</li>
                <li>• Competitive interest rates starting from 12%</li>
                <li>• Transparent fee structure</li>
                <li>• Doorstep service available</li>
                <li>• Expert financial guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoansSection;