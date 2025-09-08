import React from 'react';
import { Link } from 'react-router-dom';

const ChitFundsSection = () => {

  const chitFundBenefits = [
    {
      title: "Guaranteed Returns",
      description: "Assured returns with transparent auction process and fair distribution of benefits.",
      icon: "✅"
    },
    {
      title: "Flexible Tenure",
      description: "Choose from various tenure options ranging from 12 to 50 months as per your convenience.",
      icon: "⏰"
    },
    {
      title: "Low Commission",
      description: "Competitive commission rates with transparent fee structure and no hidden charges.",
      icon: "💰"
    },
    {
      title: "Regular Payouts",
      description: "Monthly payouts ensure regular returns and help in systematic financial planning.",
      icon: "📅"
    },
    {
      title: "Community Trust",
      description: "Join a trusted community of investors with over 13 years of successful operations in Karur.",
      icon: "🤝"
    },
    {
      title: "Expert Management",
      description: "Professional management team ensures smooth operations and timely settlements.",
      icon: "👥"
    }
  ];

  return (
    <section id="chit-funds" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Chit Funds
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our trusted <strong>chit funds</strong> community and benefit from 
            traditional investment methods with modern transparency and security.
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-xl card-shadow p-8 mb-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Our Chit Funds?
              </h3>
              <p className="text-gray-700 mb-6 text-lg">
                Our chit fund schemes combine the traditional Indian savings method with modern 
                financial practices, offering you a unique investment opportunity with guaranteed returns 
                and community benefits.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-green-600 font-semibold">Commission Rate</div>
                  <div className="text-2xl font-bold text-gray-900">3-5%</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-blue-600 font-semibold">Minimum Amount</div>
                  <div className="text-2xl font-bold text-gray-900">₹25,000</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/calculators"
                  className="btn-primary text-center"
                >
                  EMI Calculator
                </Link>
                <button 
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-secondary"
                >
                  Join Today
                </button>
              </div>
            </div>

            <div>
              <img 
                src="https://images.unsplash.com/photo-1751273907436-7057a403a818?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxzYXZpbmdzJTIwaW5kaWFuJTIwcnVwZWV8ZW58MHx8fHwxNzU2NjUwODI5fDA&ixlib=rb-4.1.0&q=85"
                alt="Indian Rupee Savings and Chit Funds"
                className="rounded-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {chitFundBenefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 card-shadow hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-700">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl card-shadow p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How Our Chit Fund Works
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Join Group</h4>
              <p className="text-gray-600 text-sm">Select a chit fund group based on your investment capacity and tenure preference.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Monthly Payment</h4>
              <p className="text-gray-600 text-sim">Make regular monthly contributions as per the group agreement.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Auction Process</h4>
              <p className="text-gray-600 text-sm">Participate in transparent monthly auctions for early withdrawals.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Receive Benefits</h4>
              <p className="text-gray-600 text-sm">Enjoy regular benefits and receive your share at maturity.</p>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Trusted Chit Funds - 13 Years of Excellence
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-4">
                Sarvam Finance has been serving our community with reliable <strong>chit funds</strong> 
                services for over 13 years. Our transparent operations and customer-first approach have made us 
                the most trusted name in traditional investment schemes.
              </p>
              <p className="text-gray-700">
                With competitive commission rates and professional management, we ensure that every member 
                receives fair treatment and maximum benefits from their chit fund investments.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Our Track Record:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• 500+ successful chit fund groups completed</li>
                <li>• Zero default record in 13 years</li>
                <li>• Transparent auction process</li>
                <li>• Regular community meets</li>
                <li>• Professional documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChitFundsSection;