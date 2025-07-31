import Sidebar from './sidebar';
import Header from './header';
import DashboardContent from './DashboardContent';
import './index.css';
import { Link, Outlet, useEffect, useState } from 'react-router-dom';
import StatsCard from './StatsCard';
import fetch from 'node-fetch';

function Dashboard() {
const property = [
  {
    id: 1,
    name: "Sunrise Apartments",
    category: "rental apartment",
    city_village: "Hyderabad",
    rental_price_per_month: 18000,
    surveyNumber: "SN1001",
    renter_name: "Ravi Kumar",
    renterAddress: "Hyderabad, Telangana",
    renterPhone: "9876543210",
    rentStartDate: "2023-01-15",
    idType: "Aadhaar",
    documentNumber: "1234-5678-9012"
  },
  {
    id: 2,
    name: "Prime Commercial Plaza",
    category: "commercial space",
    city_village: "Secunderabad",
    rental_price_per_month: 85000,
    surveyNumber: "SN1002",
    renter_name: "Priya Singh",
    renterAddress: "Secunderabad, Telangana",
    renterPhone: "9876543211",
    rentStartDate: "2023-03-10",
    idType: "PAN",
    documentNumber: "ABCDE1234F"
  },
  {
    id: 3,
    name: "Green Meadows Plot",
    category: "plot",
    city_village: "Shamirpet",
    rental_price_per_month: null,
    surveyNumber: "SN1003",
    renter_name: "",
    renterAddress: "",
    renterPhone: "",
    rentStartDate: "",
    idType: "",
    documentNumber: ""
  },
  {
    id: 4,
    name: "Lakeview Villas",
    category: "villa",
    city_village: "Kondapur",
    rental_price_per_month: 55000,
    surveyNumber: "SN1004",
    renter_name: "Vikram Das",
    renterAddress: "Kondapur, Telangana",
    renterPhone: "9876543212",
    rentStartDate: "2023-05-01",
    idType: "Voter ID",
    documentNumber: "TS1234567"
  },
  {
    id: 5,
    name: "Galaxy Residency",
    category: "rental apartment",
    city_village: "Miyapur",
    rental_price_per_month: 16000,
    surveyNumber: "SN1005",
    renter_name: "Aarti Sharma",
    renterAddress: "Miyapur, Telangana",
    renterPhone: "9876543213",
    rentStartDate: "2023-02-20",
    idType: "Aadhaar",
    documentNumber: "2345-6789-0123"
  },
  {
    id: 6,
    name: "Elite Office Tower",
    category: "commercial space",
    city_village: "HiTech City",
    rental_price_per_month: 120000,
    surveyNumber: "SN1006",
    renter_name: "TechSol Pvt Ltd",
    renterAddress: "HiTech City, Hyderabad",
    renterPhone: "040-12345678",
    rentStartDate: "2022-11-01",
    idType: "GSTIN",
    documentNumber: "36ABCDE1234F1Z5"
  },
  {
    id: 7,
    name: "Ocean Breeze Cottage",
    category: "villa",
    city_village: "Vizag",
    rental_price_per_month: 70000,
    surveyNumber: "SN1007",
    renter_name: "Sandeep Reddy",
    renterAddress: "Vizag Beach Road",
    renterPhone: "9876543214",
    rentStartDate: "2023-06-10",
    idType: "Passport",
    documentNumber: "L1234567"
  },
  {
    id: 8,
    name: "Tech Park Plot",
    category: "plot",
    city_village: "Gachibowli",
    rental_price_per_month: null,
    surveyNumber: "SN1008",
    renter_name: "",
    renterAddress: "",
    renterPhone: "",
    rentStartDate: "",
    idType: "",
    documentNumber: ""
  },
  {
    id: 9,
    name: "Royal Residency",
    category: "rental apartment",
    city_village: "Begumpet",
    rental_price_per_month: 20000,
    surveyNumber: "SN1009",
    renter_name: "Ramesh Gupta",
    renterAddress: "Begumpet, Hyderabad",
    renterPhone: "9876543215",
    rentStartDate: "2023-04-05",
    idType: "Aadhaar",
    documentNumber: "3456-7890-1234"
  },
  {
    id: 10,
    name: "Business Bay",
    category: "commercial space",
    city_village: "Banjara Hills",
    rental_price_per_month: 95000,
    surveyNumber: "SN1010",
    renter_name: "Infosys Ltd",
    renterAddress: "Banjara Hills, Hyderabad",
    renterPhone: "040-99887766",
    rentStartDate: "2022-08-01",
    idType: "GSTIN",
    documentNumber: "36XYZ1234G1Z8"
  },
]; 

 return (
        <>
            <div className="App">
                <Header data='Properties' />
                <Sidebar />
                <Outlet />
            </div>
            <div className="main-content">
                <div className="properties-container">

                    <Link to='/addproperty'>
                        <StatsCard
                            iconBg="#dbeafe"
                            className='new'
                            iconSvg={
                                <svg width="24" height="24" fill="none" stroke="#3b82f6" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 4v16m8-8H4" />
                                </svg>
                            }
                            value="Add"
                            title="New Property"
                        />
                    </Link>

                    {property.map((prop) => (
                        <Link
                            key={prop.id}
                            to={`/property`}
                            state={prop}
                            className="property-link"
                        >
                            <DashboardContent data={prop} />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Dashboard;
