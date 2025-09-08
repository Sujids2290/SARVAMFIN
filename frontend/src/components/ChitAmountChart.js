import React, { useState, useRef } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import * as htmlToImage from "html-to-image";
import * as XLSX from 'xlsx';

export default function ChitAmountChart() {
  const [chitAmount, setChitAmount] = useState(500000);
  const [months, setMonths] = useState(20);
  const [commissionPct, setCommissionPct] = useState(3);
  const [auctionMonth, setAuctionMonth] = useState(1);
  const [members, setMembers] = useState(20);

  const chartRef = useRef(null);

  const installment = chitAmount / months;
  const auctionCommission = chitAmount * (commissionPct / 100);
  const maxPayable = chitAmount - auctionCommission;

  // Function to calculate Auction Amount
  const calculateAuctionAmount = (auctionPct, k) => {
    const I = installment;
    const r = Math.pow(1 + auctionPct / 100, 1 / 12) - 1; // monthly ROI
    const n = months;

    // Summations
    let S_before = 0;
    for (let j = 1; j <= k - 1; j++) {
      S_before += Math.pow(1 + r, j);
    }

    let S_after = 0;
    for (let j = 1; j <= n - k; j++) {
      S_after += Math.pow(1 + r, -j);
    }

    let P = I * (S_before + 1 + S_after);

    // Apply caps
    P = Math.min(P, maxPayable);
    if (P < 0) P = 0;

    return Math.round(P);
  };

  // Prepare chart data
  const data = [];
  for (let pct = 12; pct <= 30; pct++) {
    const auctionAmount = calculateAuctionAmount(pct, auctionMonth);
    data.push({
      pct,
      auctionAmount,
      perPerson: Math.round(auctionAmount / members),
    });
  }

  // Download Chart as PNG
  const handleDownloadChart = () => {
    if (chartRef.current === null) return;
    htmlToImage.toPng(chartRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "auction-chart.png";
      link.href = dataUrl;
      link.click();
    });
  };

  // Download Excel
  const downloadExcel = () => {
    // Prepare data for Excel
    const excelData = data.map(item => ({
      'Auction %': `${item.pct}%`,
      'Auction Amount (₹)': item.auctionAmount,
      'Auction Commission (₹)': auctionCommission,
      'Per Person Payable (₹)': item.perPerson
    }));

    // Add summary information
    const summaryData = [
      { 'Parameter': 'Chit Amount', 'Value': `₹${chitAmount.toLocaleString('en-IN')}` },
      { 'Parameter': 'Duration', 'Value': `${months} months` },
      { 'Parameter': 'Commission Rate', 'Value': `${commissionPct}%` },
      { 'Parameter': 'Auction Month', 'Value': `Month ${auctionMonth}` },
      { 'Parameter': 'Total Members', 'Value': `${members}` }
    ];

    // Create workbook
    const wb = XLSX.utils.book_new();
    
    // Add chart data sheet
    const ws1 = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, ws1, "Chit Amount Chart");
    
    // Add summary sheet
    const ws2 = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, ws2, "Summary");

    // Download file
    XLSX.writeFile(wb, `Chit_Amount_Chart_${chitAmount}_Month${auctionMonth}.xlsx`);
  };

  // Download PDF
  const downloadPDF = () => {
    // Create a printable version
    const printWindow = window.open('', '_blank');
    const chartHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Chit Amount Chart Calculator - Sarvam Finance</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .summary { background: #f5f5f5; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
            table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #dc2626; color: white; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Chit Amount Chart Calculator</h1>
            <h2>SARVAM FINANCE AND CHIT FUNDS PVT LTD</h2>
          </div>
          
          <div class="summary">
            <h3>Chart Summary</h3>
            <p><strong>Chit Amount:</strong> ₹${chitAmount.toLocaleString('en-IN')}</p>
            <p><strong>Duration:</strong> ${months} months</p>
            <p><strong>Commission Rate:</strong> ${commissionPct}%</p>
            <p><strong>Auction Month:</strong> Month ${auctionMonth}</p>
            <p><strong>Total Members:</strong> ${members}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Auction %</th>
                <th>Auction Amount (₹)</th>
                <th>Auction Commission (₹)</th>
                <th>Per Person Payable (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${data.map(item => `
                <tr>
                  <td>${item.pct}%</td>
                  <td>₹${item.auctionAmount.toLocaleString('en-IN')}</td>
                  <td>₹${auctionCommission.toLocaleString('en-IN')}</td>
                  <td><strong>₹${item.perPerson.toLocaleString('en-IN')}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="no-print">
            <button onclick="window.print()">Print / Save as PDF</button>
            <button onclick="window.close()">Close</button>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(chartHTML);
    printWindow.document.close();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Chit Amount Chart Calculator</h2>
        <p className="text-gray-600">
          Calculate precise auction amounts based on auction month and ROI percentages using advanced financial modeling
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Input Parameters</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chit Amount (₹)
            </label>
            <input
              type="number"
              value={chitAmount}
              onChange={(e) => setChitAmount(Number(e.target.value))}
              className="custom-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. of Months
            </label>
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="custom-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commission Rate (%)
            </label>
            <input
              type="number"
              value={commissionPct}
              onChange={(e) => setCommissionPct(Number(e.target.value))}
              className="custom-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auction Month
            </label>
            <input
              type="number"
              min="1"
              max={months}
              value={auctionMonth}
              onChange={(e) => setAuctionMonth(Number(e.target.value))}
              className="custom-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Members
            </label>
            <input
              type="number"
              value={members}
              onChange={(e) => setMembers(Number(e.target.value))}
              className="custom-input"
            />
          </div>
        </div>
      </div>

      {/* Header Stats */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Header Stats (Fixed)</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">₹{installment.toLocaleString('en-IN')}</div>
            <div className="text-sm text-gray-600">Per-Installment</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">₹{auctionCommission.toLocaleString('en-IN')}</div>
            <div className="text-sm text-gray-600">Commission</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">₹{maxPayable.toLocaleString('en-IN')}</div>
            <div className="text-sm text-gray-600">Max Payable to Winner</div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div ref={chartRef} className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="pct" 
                label={{ value: "Auction %", position: "insideBottom", offset: -10 }} 
              />
              <YAxis
                tickFormatter={(val) => `₹${val.toLocaleString()}`}
                label={{ value: "Auction Amount (₹)", angle: -90, position: "insideLeft" }}
              />
              <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} />
              <Line 
                type="monotone" 
                dataKey="auctionAmount" 
                stroke="#2563eb" 
                strokeWidth={3} 
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Download Buttons */}
        <div className="flex space-x-4 mt-4 justify-end">
          <button
            onClick={handleDownloadChart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center"
          >
            <span className="mr-2">📊</span>
            Download Chart
          </button>
          <button
            onClick={downloadExcel}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center"
          >
            <span className="mr-2">📈</span>
            Download Excel
          </button>
          <button
            onClick={downloadPDF}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center"
          >
            <span className="mr-2">📄</span>
            Print/PDF
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-red-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                Auction %
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                Auction Amount (₹)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                Auction Commission (₹)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                Per Person Payable (₹)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.pct}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">
                  ₹{item.auctionAmount.toLocaleString('en-IN')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                  ₹{auctionCommission.toLocaleString('en-IN')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                  ₹{item.perPerson.toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formula Information */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Calculation Method</h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p><strong>Formula:</strong> P = I × (S_before + 1 + S_after)</p>
          <p><strong>Where:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>I = Monthly Installment (Chit Amount ÷ Months)</li>
            <li>r = Monthly ROI Rate = (1 + Auction%)^(1/12) - 1</li>
            <li>S_before = Sum of growth factors for past months</li>
            <li>S_after = Sum of discount factors for future months</li>
          </ul>
          <p className="mt-3"><strong>Applied Cap:</strong> Min(Calculated Amount, Chit Amount - Commission)</p>
        </div>
      </div>
    </div>
  );
}