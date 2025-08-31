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
          backgroundImage: `url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBncm93dGh8ZW58MHx8fHwxNzU2NjIwNjE5fDA&ixlib=rb-4.1.0&q=85')`
        }}
      ></div>
      {/* Semi-transparent Red Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-800/90"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="fade-in">
            <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6 text-shadow">
              Grow Your<br/>Money<br/>With Trust
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 leading-relaxed">
              Your trusted partner for <span className="font-semibold text-white">Karur gold loans</span>, 
              <span className="font-semibold text-white"> chit funds</span>, and 
              <span className="font-semibold text-white"> deposits</span>. Experience reliable financial services with competitive rates and personalized solutions.
            </p>
            
            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <h3 className="text-lg font-bold mb-2">Up to 12% Returns</h3>
                <p className="text-red-200 text-sm">On deposits</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold mb-2">From 12% Interest</h3>
                <p className="text-red-200 text-sm">On loans</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold mb-2">Secure & Trusted</h3>
                <p className="text-red-200 text-sm">RBI compliant</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold mb-2">Expert Guidance</h3>
                <p className="text-red-200 text-sm">Personal support</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('loans')}
                className="btn-primary bg-white text-red-600 hover:bg-gray-100"
              >
                Explore Loans
              </button>
              <button 
                onClick={() => scrollToSection('deposits')}
                className="btn-secondary border-white text-white hover:bg-white hover:text-red-600"
              >
                View Deposits
              </button>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="mt-12 lg:mt-0 slide-up">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBncm93dGh8ZW58MHx8fHwxNzU2NjIwNjE5fDA&ixlib=rb-4.1.0&q=85"
                  alt="Grow your money with Sarvam Finance"
                  className="rounded-lg w-full h-48 object-cover mb-4"
                />
                <h3 className="text-2xl font-bold mb-4">Grow your money with Sarvam Finance</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">12%</div>
                  <div className="text-red-200 text-sm">Max Returns</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">₹1L+</div>
                  <div className="text-red-200 text-sm">Gold Loans</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;