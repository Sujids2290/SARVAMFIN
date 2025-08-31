import React from 'react';

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative text-white pt-20">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxzYXZpbmdzJTIwbW9uZXklMjBncm93dGh8ZW58MHx8fHwxNzU2NjQ3NTQ5fDA&ixlib=rb-4.1.0&q=85')`
        }}
      ></div>
      {/* Semi-transparent Red Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-800/90"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="fade-in">
            <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6 text-shadow">
              Your Trusted Financial Partner
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 leading-relaxed">
              Expert solutions for <span className="font-semibold text-white">gold loans</span>, 
              <span className="font-semibold text-white"> chit funds</span>, and 
              <span className="font-semibold text-white"> deposits</span> - serving our community with integrity for over 13 years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('loans')}
                className="btn-primary bg-white text-red-600 hover:bg-gray-100"
              >
                Explore Loans
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-secondary border-white text-white hover:bg-white hover:text-red-600"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="mt-12 lg:mt-0 slide-up">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxmaW5hbmNpYWwlMjBzZXJ2aWNlc3xlbnwwfHx8fDE3NTY2NDUwNDF8MA&ixlib=rb-4.1.0&q=85"
                alt="Financial Services in Karur"
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="slide-up">
            <div className="text-3xl font-bold mb-2">13+</div>
            <div className="text-red-200">Years of Trust</div>
          </div>
          <div className="slide-up" style={{animationDelay: '0.1s'}}>
            <div className="text-3xl font-bold mb-2">5000+</div>
            <div className="text-red-200">Happy Customers</div>
          </div>
          <div className="slide-up" style={{animationDelay: '0.2s'}}>
            <div className="text-3xl font-bold mb-2">₹50Cr+</div>
            <div className="text-red-200">Loans Disbursed</div>
          </div>
          <div className="slide-up" style={{animationDelay: '0.3s'}}>
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-red-200">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;