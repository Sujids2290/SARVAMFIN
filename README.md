# SARVAM FINANCE AND CHIT FUNDS LTD - Official Website

A modern, professional financial services website for SARVAM FINANCE AND CHIT FUNDS LTD, serving the Karur community for over 13 years.

![Website Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20FastAPI%20%7C%20MongoDB-blue)
![Professional](https://img.shields.io/badge/Design-Professional-red)

## 🏢 Company Information

**SARVAM FINANCE AND CHIT FUNDS LTD**
- **Address**: 13, Chairman Ramanujam Street, Karur
- **CEO**: Dhinesh Periyasamy
- **Established**: 2011 (13+ years of trust)
- **Slogan**: "Built on Trust for the past 13 years"
- **Phone**: +91 94428 75000
- **Email**: info@sarvamfinance.com

## 🌟 Features

### Professional Website
- **Modern Design**: Clean, trustworthy UI similar to Groww platform
- **SEO Optimized**: Targeting "Karur gold loan", "Chit funds Karur", "Karur deposits"
- **Mobile Responsive**: Perfect experience across all devices
- **Red Theme**: Consistent branding with company logo

### Service Sections
1. **Loans Section**
   - Gold Loans (up to 12 months)
   - Short Term Loans (up to 12 months) 
   - Mortgage Loans (up to 10 years)
   - Hire Purchase Loans (up to 5 years)
   - Interest rates from 12% per annum

2. **Deposits Section**
   - Fixed Deposits (up to 12% per annum)
   - Recurring Deposits
   - Cumulative Deposits

3. **Chit Funds Section**
   - Transparent auction process
   - Community-based savings
   - Professional management

4. **CEO Message**
   - Inspiring leadership message
   - Company vision and values
   - 13 years journey story

5. **Contact Section**
   - Contact form with validation
   - Google Maps integration
   - Complete business information

### Finance Calculators
1. **EMI Calculator**
   - Loan amount, interest rate, tenure inputs
   - Monthly EMI calculation
   - Total interest and amount breakdown
   - Visual loan composition chart

2. **Auction Chit Fund Calculator**
   - Chit amount, months, auction percentage
   - Commission selection (3% or 5%)
   - Monthly payable calculation
   - Detailed benefit breakdown

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19
- **Routing**: React Router DOM 7.5.1
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Radix UI components
- **Build Tool**: Craco 7.1.0
- **Package Manager**: Yarn

### Backend
- **Framework**: FastAPI 0.110.1
- **Database**: MongoDB with Motor driver
- **Server**: Uvicorn 0.25.0
- **Environment**: Python 3.11
- **Process Manager**: Supervisor

### Database
- **MongoDB**: Document-based storage
- **Collections**: Status checks, contact forms
- **Connection**: Motor async driver

## 📱 Pages & Navigation

### Main Website (/)
- Hero Section with trust indicators
- Loans showcase with interactive selection
- Deposits information with benefit highlights
- Chit Funds explanation with process flow
- CEO message with professional photo
- Contact form with Google Maps
- Professional footer with SEO keywords

### Finance Calculators (/calculators)
- EMI Calculator with real-time results
- Chit Fund Calculator with detailed breakdown
- Professional calculator interface
- Reset functionality for both calculators

## 🧮 Calculator Accuracy

### EMI Calculator
**Test Case**: ₹5,00,000 loan, 12% interest, 24 months
- **Monthly EMI**: ₹23,537 ✅
- **Total Interest**: ₹64,882 ✅
- **Total Amount**: ₹5,64,882 ✅

### Chit Fund Calculator  
**Test Case**: ₹5,00,000 chit, 20 months, 18% auction, 3% commission
- **Monthly Contribution**: ₹25,000 ✅
- **Auction Discount**: ₹90,000 ✅
- **Commission**: ₹15,000 ✅
- **Net Discount**: ₹75,000 ✅
- **Monthly Payable**: ₹21,250 ✅

## 🎨 Design Features

- **Professional Color Scheme**: Red theme matching company branding
- **Typography**: Clean, readable fonts with proper hierarchy
- **Images**: High-quality stock photos for financial services
- **Animations**: Smooth hover effects and transitions
- **Layout**: Card-based design with proper spacing
- **Icons**: Consistent emoji and icon usage
- **Shadows**: Subtle shadows for depth and professionalism

## 📱 Responsive Design

- **Desktop**: Optimized for 1920x1080 and larger screens
- **Tablet**: Responsive grid layout for 768px+ screens  
- **Mobile**: Mobile-first design for 390px+ screens
- **Navigation**: Collapsible mobile menu
- **Touch**: Touch-friendly buttons and interactions

## 🔍 SEO Optimization

### Meta Tags
- **Title**: "SARVAM FINANCE - Karur Gold Loan, Chit Funds Karur, Karur Deposits"
- **Description**: Comprehensive description with local keywords
- **Keywords**: "Karur gold loan, chit funds Karur, Karur deposits"

### Structured Data
- **Schema.org**: Local business markup
- **Services**: Detailed service catalog
- **Contact**: Complete business information
- **Reviews**: Ready for customer review integration

### Open Graph
- **Social Media**: Optimized for Facebook and Twitter sharing
- **Images**: Professional preview images
- **Descriptions**: Compelling social media descriptions

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- MongoDB
- Yarn package manager

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   yarn install
   ```

### Running the Application

1. Start all services:
   ```bash
   sudo supervisorctl restart all
   ```

2. Or run individually:
   ```bash
   # Backend
   cd backend
   uvicorn server:app --reload --host 0.0.0.0 --port 8001
   
   # Frontend
   cd frontend
   yarn start
   ```

### Current Deployment
- **Live Website**: https://finance-tools-5.preview.emergentagent.com
- **API Docs**: https://finance-tools-5.preview.emergentagent.com/api/docs
- **Status**: ✅ Fully Functional

## 📞 Support & Maintenance

For technical support or website updates, contact the development team.

**Website Status**: ✅ Fully Functional and Production Ready

---

*Built with ❤️ for SARVAM FINANCE AND CHIT FUNDS LTD - Serving Karur with trust for 13+ years*
