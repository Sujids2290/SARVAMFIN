import React, { useState } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import LoansSection from './LoansSection';
import DepositsSection from './DepositsSection';
import ChitFundsSection from './ChitFundsSection';
import CEOMessage from './CEOMessage';
import ContactSection from './ContactSection';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <LoansSection />
        <DepositsSection />
        <ChitFundsSection />
        <CEOMessage />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;