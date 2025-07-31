import React, { useState, useEffect } from 'react';
import './style.css';
import Sidebar from './sidebar';
import Header from './header';
import axios from 'axios';

const Bills = () => {
  const [bills, setBills] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/bills')
      .then(response => {
        setBills(response.data);  
        console.log('Bills:', response.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <div className="App">
        <Header data="Bills" />
        <Sidebar />
      </div>

      <div className="main-content">
        <div className="properties-container">
          <div className="bills-container">
            <h2 className="section-title">Billing History</h2>
            <div className="bills-ribbon">
              {/* <button className="bills-btn">Pay Bills</button> */}
              <button className="bills-btn">Fetch Paid Bills</button>
              <button className="bills-btn">Fetch Pending Bills</button>
            </div>

            <table className="bills-table">
              <thead>
                <tr>
                  <th>Bill No</th>
                  <th>Paid Date</th>
                  <th>Customer</th>
                  <th>Amount(₹)</th>
                  <th>Status</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {bills.length === 0 ? (
                  <tr>
                    <td colSpan="6">Loading bills...</td>
                  </tr>
                ) : (
                  bills.map((bill, index) => (
                    <tr key={index}>
                      <td>{bill.billNo}</td>
                      <td>{bill.date}</td>
                      <td>{bill.customer}</td>
                      <td>{bill.amount}</td>
                      <td className={`status ${bill.status.toLowerCase()}`}>
                        {bill.status}
                      </td>
                      <td>
                        <button className="download-btn">Download</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bills;
