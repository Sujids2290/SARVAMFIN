import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_project-merger/artifacts/bd15rkvw_sarvam%20%281%29.png" 
                alt="Sarvam Finance Logo" 
                className="h-28 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted financial partner in Karur for over 13 years. 
              Built on trust, driven by service excellence.
            </p>
            <div className="text-red-400 font-semibold mb-4">
              Built on Trust for the past 13 years
            </div>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                <span className="text-white text-sm">f</span>
              </div>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                <span className="text-white text-sm">t</span>
              </div>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                <span className="text-white text-sm">in</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('loans')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Gold Loans
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('loans')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Short Term Loans
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('loans')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Mortgage Loans
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('deposits')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Fixed Deposits
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('chit-funds')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Chit Funds
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('ceo')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  CEO Message
                </button>
              </li>
              <li>
                <Link 
                  to="/calculators"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Calculators
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <span className="text-gray-300">Privacy Policy</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start">
                <span className="text-red-400 mr-2">🏢</span>
                <div>
                  <div className="font-semibold">SARVAM FINANCE AND CHITFUNDS PVT LTD</div>
                  <div className="text-sm">Your trusted financial partner in Karur</div>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-red-400 mr-2">📍</span>
                <div>
                  <div className="font-semibold">Address</div>
                  <div className="text-sm">13, Chairman Ramanujam Street, Karur</div>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-red-400 mr-2">📞</span>
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-sm">04324-233844</div>
                  <div className="text-sm">8940448844</div>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-red-400 mr-2">✉️</span>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-sm">dhinesh@sarvamgroups.in</div>
                  <div className="text-sm">info@sarvamgroups.in</div>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-red-400 mr-2">🕒</span>
                <div>
                  <div className="font-semibold">Business Hours</div>
                  <div className="text-sm">Mon to Sat: 10AM - 7PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Keywords Footer */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="text-center text-gray-400 text-sm">
            <p className="mb-2">
              <strong>Karur's Trusted Financial Services:</strong> Karur gold loan | Chit funds Karur | Karur deposits | 
              Financial services Karur | Gold loans Karur | Personal loans Karur | Business loans Karur
            </p>
            <p>
              Serving Karur, Tiruchirappalli, Salem, Namakkal, and surrounding areas with comprehensive financial solutions
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 SARVAM FINANCE AND CHITFUNDS PVT LTD. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>Built on Trust</span>
              <span>•</span>
              <span>13 Years of Excellence</span>
              <span>•</span>
              <span>5000+ Happy Customers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;