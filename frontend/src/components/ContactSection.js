import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for your interest! Our team will contact you within 24 hours.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    }, 2000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your financial journey? Get in touch with our expert team 
            for personalized financial solutions in Karur.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Contact Information */}
          <div className="mb-12 lg:mb-0">
            <div className="bg-white rounded-xl card-shadow p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
              
              {/* Company Info */}
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white text-xl">🏢</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">SARVAM FINANCE AND CHITFUNDS PVT LTD</h4>
                    <p className="text-gray-600">Your trusted financial partner in Karur</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white text-xl">📍</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Address</h4>
                    <p className="text-gray-600">13, Chairman Ramanujam Street, Karur</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600">04324-233844</p>
                    <p className="text-gray-600">8940448844</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white text-xl">✉️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">dhinesh@sarvamgroups.in</p>
                    <p className="text-gray-600">info@sarvamgroups.in</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white text-xl">🕒</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Business Hours</h4>
                    <p className="text-gray-600">Monday - Saturday: 10:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Quick Services */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4">Quick Services</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center bg-red-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="text-sm font-semibold text-gray-900">Quick Loans</div>
                    <div className="text-xs text-gray-600">24hr Approval</div>
                  </div>
                  <div className="text-center bg-red-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">💰</div>
                    <div className="text-sm font-semibold text-gray-900">Gold Loans</div>
                    <div className="text-xs text-gray-600">Instant Cash</div>
                  </div>
                  <div className="text-center bg-red-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">📈</div>
                    <div className="text-sm font-semibold text-gray-900">Deposits</div>
                    <div className="text-xs text-gray-600">Up to 12%</div>
                  </div>
                  <div className="text-center bg-red-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="text-sm font-semibold text-gray-900">Chit Funds</div>
                    <div className="text-xs text-gray-600">Trusted Groups</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-xl card-shadow p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              
              {submitMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">{submitMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="custom-input"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="custom-input"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="custom-input"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Interest *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="custom-select"
                  >
                    <option value="">Select a service</option>
                    <option value="gold-loan">Gold Loan</option>
                    <option value="short-term-loan">Short Term Loan</option>
                    <option value="mortgage-loan">Mortgage Loan</option>
                    <option value="hire-purchase">Hire Purchase Loan</option>
                    <option value="fixed-deposit">Fixed Deposit</option>
                    <option value="recurring-deposit">Recurring Deposit</option>
                    <option value="cumulative-deposit">Cumulative Deposit</option>
                    <option value="chit-funds">Chit Funds</option>
                    <option value="general-inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="custom-input"
                    placeholder="Tell us about your financial needs..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${isSubmitting ? 'bg-gray-400' : 'btn-primary'} flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className="bg-white rounded-xl card-shadow p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find Us</h3>
            <div className="relative h-80 bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.8756041234567!2d78.0767165520949!3d10.961818120016913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDU3JzQyLjUiTiA3OMKwMDQnMzYuMiJF!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sarvam Finance Location"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                <strong>SARVAM FINANCE AND CHITFUNDS PVT LTD</strong><br />
                13, Chairman Ramanujam Street, Karur, Tamil Nadu
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;