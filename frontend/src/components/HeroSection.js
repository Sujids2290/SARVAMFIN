import React from 'react';

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="fade-in">
            <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Grow Your<br/>
              <span className="text-red-600">Money</span><br/>
              With Trust
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Your trusted partner for <span className="font-semibold text-gray-900">Karur gold loans</span>, 
              <span className="font-semibold text-gray-900"> chit funds</span>, and 
              <span className="font-semibold text-gray-900"> deposits</span>. Experience reliable financial services with competitive rates and personalized solutions.
            </p>
            
            {/* Feature Highlights - 2x2 Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Up to 12% Returns */}
              <div className="flex items-center bg-red-50 p-4 rounded-lg">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Up to 12% Returns</div>
                  <div className="text-sm text-gray-600">On deposits</div>
                </div>
              </div>

              {/* From 12% Interest */}
              <div className="flex items-center bg-red-50 p-4 rounded-lg">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.314 1.51A4.44 4.44 0 009 14.98V16a1 1 0 102 0v-1.092c.65-.05 1.316-.279 1.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.314-1.51A4.44 4.44 0 0011 5.02V4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">From 12% Interest</div>
                  <div className="text-sm text-gray-600">On loans</div>
                </div>
              </div>

              {/* Secure & Trusted */}
              <div className="flex items-center bg-yellow-50 p-4 rounded-lg">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Secure & Trusted</div>
                  <div className="text-sm text-gray-600">RBI compliant</div>
                </div>
              </div>

              {/* Expert Guidance */}
              <div className="flex items-center bg-orange-50 p-4 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Expert Guidance</div>
                  <div className="text-sm text-gray-600">Personal support</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('loans')}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              >
                Explore Loans
              </button>
              <button 
                onClick={() => scrollToSection('deposits')}
                className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              >
                View Deposits
              </button>
            </div>
          </div>

          {/* Right Content - Financial Growth Image with Stats */}
          <div className="mt-12 lg:mt-0 slide-up">
            <div className="relative">
              {/* Main Image */}
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBncm93dGh8ZW58MHx8fHwxNzU2NjIwNjE5fDA&ixlib=rb-4.1.0&q=85"
                  alt="Grow your money with Sarvam Finance"
                  className="rounded-2xl w-full h-80 object-cover shadow-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10 rounded-2xl"></div>
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute top-4 right-4 bg-white rounded-lg px-4 py-2 shadow-lg">
                <div className="text-2xl font-bold text-red-600">12%</div>
                <div className="text-xs text-gray-600">Max Returns</div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-white rounded-lg px-4 py-2 shadow-lg">
                <div className="text-2xl font-bold text-red-600">₹1L+</div>
                <div className="text-xs text-gray-600">Gold Loans</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;