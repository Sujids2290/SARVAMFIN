import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_project-merger/artifacts/h3znmb1l_Sarvam%20Logo%20%282%29.pdf%20%28120%20x%2060%20px%29.png" 
              alt="Sarvam Finance Logo" 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('loans')}
              className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
            >
              Loans
            </button>
            <button 
              onClick={() => scrollToSection('deposits')}
              className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
            >
              Deposits
            </button>
            <button 
              onClick={() => scrollToSection('chit-funds')}
              className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
            >
              Chit Funds
            </button>
            <button 
              onClick={() => scrollToSection('ceo')}
              className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
            >
              CEO
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
            >
              Contact
            </button>
            <Link 
              to="/calculators"
              className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
            >
              Finance Calculators
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-primary"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-600 focus:outline-none focus:text-red-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-red-600 font-medium py-2 px-4 text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('loans')}
                className="text-gray-700 hover:text-red-600 font-medium py-2 px-4 text-left"
              >
                Loans
              </button>
              <button 
                onClick={() => scrollToSection('deposits')}
                className="text-gray-700 hover:text-red-600 font-medium py-2 px-4 text-left"
              >
                Deposits
              </button>
              <button 
                onClick={() => scrollToSection('chit-funds')}
                className="text-gray-700 hover:text-red-600 font-medium py-2 px-4 text-left"
              >
                Chit Funds
              </button>
              <button 
                onClick={() => scrollToSection('ceo')}
                className="text-gray-700 hover:text-red-600 font-medium py-2 px-4 text-left"
              >
                CEO
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-red-600 font-medium py-2 px-4 text-left"
              >
                Contact
              </button>
              <Link 
                to="/calculators"
                className="text-gray-700 hover:text-red-600 font-medium py-2 px-4 text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Finance Calculators
              </Link>
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-primary mt-4 mx-4"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;