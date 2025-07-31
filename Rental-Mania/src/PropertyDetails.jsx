import React from 'react';
import './style.css';
import { useLocation } from 'react-router-dom';
import Sidebar from './sidebar';
import Header from './header';

const PropertyDetails = () => {
  const location = useLocation();
  const property = location.state;

  if (!property) {
    return <p>No Details were Found</p>;
  }

  return (
    <>
      <div className="App">
        <Header data="Property Details" />
        <Sidebar />
      </div>
      <div className="main-content">
        <div className="properties-container">
          <div className="property-details-container">
            <div className="property-details-card">
              <h2 className="details-title">{property.name || 'N/A'}</h2>

              <table className="property-table">
                <tbody>
                  <tr>
                    <th>Category</th>
                    <td>{property.category || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{property.address || property.city_village || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th>Rent</th>
                    <td>
                      {property.rent || property.rental_price_per_month
                        ? `₹${property.rent || property.rental_price_per_month}`
                        : 'N/A'}
                    </td>
                  </tr>

                  {property.surveyNumber && (
                    <tr>
                      <th>Survey Number</th>
                      <td>{property.surveyNumber}</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <h3 className="section-subtitle">Renter Information</h3>

              <table className="property-table">
                <tbody>
                  <tr>
                    <th>Renter Name</th>
                    <td>{property.renter_name || 'N/A'}</td>
                  </tr>
                  {property.renterAddress && (
                    <tr>
                      <th>Renter Address</th>
                      <td>{property.renterAddress}</td>
                    </tr>
                  )}
                  {property.renterPhone && (
                    <tr>
                      <th>Phone</th>
                      <td>{property.renterPhone}</td>
                    </tr>
                  )}
                  {property.rentStartDate && (
                    <tr>
                      <th>Rent from Date</th>
                      <td>{property.rentStartDate}</td>
                    </tr>
                  )}
                  {property.idType && (
                    <tr>
                      <th>ID Type</th>
                      <td>{property.idType}</td>
                    </tr>
                  )}
                  {property.documentNumber && (
                    <tr>
                      <th>ID Number</th>
                      <td>{property.documentNumber}</td>
                    </tr>
                  )}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;
