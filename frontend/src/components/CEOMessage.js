import React from 'react';

const CEOMessage = () => {
  return (
    <section id="ceo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            CEO Message
          </h2>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-8 lg:p-12">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12 items-center">
            {/* CEO Photo */}
            <div className="text-center mb-8 lg:mb-0">
              <div className="relative inline-block">
                <div className="w-48 h-64 overflow-hidden rounded-lg border-4 border-white shadow-lg">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_project-merger/artifacts/7pqm7d7f_ad42e067-49a4-4e7e-8007-1c31e8306808.jpg"
                    alt="Dhinesh Periyasamy - CEO, Sarvam Finance"
                    className="w-full h-full object-cover brightness-110 contrast-105"
                    style={{filter: 'brightness(1.1) contrast(1.05) saturate(1.1)'}}
                  />
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mt-6">Dhinesh Periyasamy</h3>
              <p className="text-red-600 font-semibold">Chief Executive Officer</p>
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-full text-sm font-semibold">
                Built on Trust for 13 Years
              </div>
            </div>

            {/* CEO Message */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="text-6xl text-red-300 absolute -top-4 -left-4 font-serif">"</div>
                <div className="pl-8">
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    When I started Sarvam Finance 13 years ago, I had a simple vision: to create a financial 
                    institution that truly serves the people of Karur with integrity, transparency, and genuine care. 
                    Today, as I look back at our journey, I'm proud to say we've not just met that vision, but exceeded it.
                  </p>
                  
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Our story began with a young entrepreneur who believed that financial services should be 
                    accessible, affordable, and trustworthy. Starting with just ₹50,000 and a dream, 
                    we've grown to serve over 5,000 families across Karur while maintaining 
                    our core values of trust and transparency.
                  </p>
                  
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    What sets us apart is not just our competitive rates or quick service, but our commitment to 
                    understanding each customer's unique needs. Whether it's a gold loan for urgent medical expenses, 
                    a business loan for expansion, or a chit fund investment for future security, we treat every 
                    customer like family.
                  </p>
                  
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    As we move forward, our promise remains unchanged: to continue serving our community with the 
                    same dedication and trust that has been our foundation for the past 13 years. Your dreams are 
                    our mission, and your success is our greatest achievement.
                  </p>
                  
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-red-600 mb-2">Built on Trust for the past 13 years</div>
                      <div className="text-gray-600">- Our Commitment to YOU</div>
                    </div>
                  </div>
                </div>
                <div className="text-6xl text-red-300 absolute -bottom-4 right-0 font-serif transform rotate-180">"</div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Values */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="text-center bg-white rounded-xl p-6 card-shadow">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🛡️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Trust & Integrity</h3>
            <p className="text-gray-600">
              13 years of unwavering commitment to honest and transparent financial services.
            </p>
          </div>
          
          <div className="text-center bg-white rounded-xl p-6 card-shadow">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Customer First</h3>
            <p className="text-gray-600">
              Every decision we make is centered around our customers' needs and financial well-being.
            </p>
          </div>
          
          <div className="text-center bg-white rounded-xl p-6 card-shadow">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🌟</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
            <p className="text-gray-600">
              Continuous innovation and improvement in our services to exceed expectations.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have trusted us with their financial needs. 
            Experience the Sarvam Finance difference today.
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary text-lg px-8 py-4"
          >
            Start Your Financial Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default CEOMessage;