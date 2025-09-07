import React from 'react';

const DepositsSection = () => {
  const depositTypes = [
    {
      title: "Fixed Deposits",
      rate: "Competitive Returns",
      description: "Secure your future with our high-yield fixed deposit schemes offering guaranteed returns.",
      features: [
        "Competitive interest rates",
        "Flexible tenure options",
        "Premature withdrawal facility",
        "Auto-renewal options",
        "Loan facility against FD"
      ],
      icon: "📈",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Recurring Deposits",
      rate: "Regular Savings",
      description: "Build your savings systematically with our recurring deposit plans designed for regular savers.",
      features: [
        "Monthly investment from ₹500",
        "Flexible tenure from 1-10 years",
        "Higher returns than savings account",
        "Easy online management",
        "Maturity benefit calculator"
      ],
      icon: "💳",
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Cumulative Deposits",
      rate: "Compounding Benefits",
      description: "Maximize your returns with our cumulative deposit schemes where interest compounds quarterly.",
      features: [
        "Quarterly compounding benefit",
        "Higher effective yield",
        "Minimum deposit ₹10,000",
        "Tax-saving benefits available",
        "Nomination facility"
      ],
      icon: "🎯",
      color: "bg-purple-50 border-purple-200"
    }
  ];

  return (
    <section id="deposits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Deposit Schemes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Grow your wealth with our attractive <strong>Karur deposits</strong> offering 
            competitive returns up to 12% per annum with complete security and flexibility.
          </p>
        </div>

        {/* Deposits Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {depositTypes.map((deposit, index) => (
            <div 
              key={index}
              className={`rounded-xl border-2 ${deposit.color} p-8 card-shadow hover:scale-105 transition-all duration-300`}
            >
              <div className="text-5xl mb-6 text-center">{deposit.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{deposit.title}</h3>
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-red-600 mb-2">{deposit.rate}</div>
                <p className="text-gray-700">{deposit.description}</p>
              </div>
              
              <div className="space-y-3">
                {deposit.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <button 
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary w-full"
                >
                  Open Account
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Our Karur Deposits?
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Higher Returns</h4>
                    <p className="text-gray-700">Competitive interest rates up to 12% per annum</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Complete Security</h4>
                    <p className="text-gray-700">Your deposits are fully secured and insured</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Flexible Options</h4>
                    <p className="text-gray-700">Choose tenure and deposit amounts as per your needs</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxtb25leSUyMGdyb3d0aHxlbnwwfHx8fDE3NTY2NTA4MzV8MA&ixlib=rb-4.1.0&q=85"
                alt="Savings Growth and Deposits"
                className="rounded-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Start Your Investment Journey Today
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied investors who trust Sarvam Finance for their deposit needs. 
            Our expert team will help you choose the best deposit scheme for your financial goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary"
            >
              Open Deposit Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepositsSection;