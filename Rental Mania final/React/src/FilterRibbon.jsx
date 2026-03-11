import { useState } from 'react';
import './style.css';
import Sidebar from './sidebar';
import Header from './header';

const UpdateProperty = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    rent: '',
    surveyNumber: '',
    renter_name: '',
    renterAddress: '',
    renterPhone: '',
    rentStartDate: '',
    idType: '',
    documentNumber: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit — just read and print the form data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Entered:', formData);
    alert('Check the console for submitted form data!');
  };

  return (
    <>
      <div className="App">
        <Header data="Update Property" />
        <Sidebar />
      </div>

      <div className="main-content">
        <div className="update-container">
          <h2>Enter Property Details</h2>

          <form className="update-form" onSubmit={handleSubmit}>
            {/* Property Info */}
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>

            <label>
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </label>

            <label>
              Rent (₹):
              <input
                type="number"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
              />
            </label>

            <label>
              Survey Number:
              <input
                type="text"
                name="surveyNumber"
                value={formData.surveyNumber}
                onChange={handleChange}
              />
            </label>

            <hr />
            <h3>Renter Details</h3>

            <label>
              Renter Name:
              <input
                type="text"
                name="renter_name"
                value={formData.renter_name}
                onChange={handleChange}
              />
            </label>

            <label>
              Renter Address:
              <input
                type="text"
                name="renterAddress"
                value={formData.renterAddress}
                onChange={handleChange}
              />
            </label>

            <label>
              Phone Number:
              <input
                type="text"
                name="renterPhone"
                value={formData.renterPhone}
                onChange={handleChange}
              />
            </label>

            <label>
              Rent Starting Date:
              <input
                type="date"
                name="rentStartDate"
                value={formData.rentStartDate}
                onChange={handleChange}
              />
            </label>

            <hr />
            <h3>Proofs & Agreements</h3>

            <label>
              ID Proof Type:
              <select
                name="idType"
                value={formData.idType}
                onChange={handleChange}
              >
                <option value="">-- Select --</option>
                <option value="aadhaar">Aadhaar</option>
                <option value="pan">PAN</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label>
              ID Document Number:
              <input
                type="text"
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleChange}
              />
            </label>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProperty;
