import React, { useState } from 'react';
import './style.css';

const AddRentalProperty = () => {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    address: '',
    rent: '',
    renterName: '',
    renterAddress: '',
    startDate: '',
    idType: '',
    documentNumber: '',
    phone: '',
    surveyNumber: '',
    dimensions: '',
    apartmentBlock: '',
    apartmentNo: '',
    villaName: '',
    shutterNo: '',
    floorNo: '',
    idProofFile: null,
    profilePhoto: null,
    rentalAgreement: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Property submitted with all renter and document details ✅");
    console.log(formData);
    // Handle upload logic or API submission here
  };

  return (
    <form className="add-property-form" onSubmit={handleSubmit}>
      <h2>Add New Rental Property</h2>

      <select name="category" value={formData.category} onChange={handleChange} required>
        <option value="">Select Category</option>
        <option value="rental apartment">Rental Apartment</option>
        <option value="rental home">Rental Home</option>
        <option value="commercial space">Commercial Space</option>
        <option value="open land">Open Land</option>
        <option value="agriculture land">Agriculture Land</option>
        <option value="plot">Plot</option>
        <option value="villa">Villa/Independent House</option>
      </select>

      <input type="text" name="name" placeholder="Property Name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
      <input type="number" name="rent" placeholder="Rent (₹)" value={formData.rent} onChange={handleChange} />
      
      {/* Dynamic fields based on category */}
      {formData.category === ('rental apartment' || 'rental home') && (
        <>
          <input type="text" name="apartmentBlock" placeholder="Apartment Block" value={formData.apartmentBlock} onChange={handleChange} />
          <input type="text" name="apartmentNo" placeholder="Flat/Apartment No" value={formData.apartmentNo} onChange={handleChange} />
        </>
      )}

      {formData.category === 'villa' && (
        <input type="text" name="villaName" placeholder="Villa Name or Area" value={formData.villaName} onChange={handleChange} />
      )}

      {formData.category === 'commercial space' && (
        <>
          <input type="text" name="shutterNo" placeholder="Shutter No." value={formData.shutterNo} onChange={handleChange} />
          <input type="text" name="floorNo" placeholder="Floor No." value={formData.floorNo} onChange={handleChange} />
        </>
      )}

      {['open land', 'agriculture land', 'plot'].includes(formData.category) && (
        <>
          <input type="text" name="surveyNumber" placeholder="Survey Number" value={formData.surveyNumber} onChange={handleChange} />
          <input type="text" name="dimensions" placeholder="Dimensions (e.g. 40x60 ft)" value={formData.dimensions} onChange={handleChange} />
        </>
      )}

      {/* Renter Info */}
      <hr />
      <h3>Renter Details</h3>

      <input type="text" name="renterName" placeholder="Renter Name" value={formData.renterName} onChange={handleChange} required />
      <input type="text" name="renterAddress" placeholder="Renter Address" value={formData.renterAddress} onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
      <input type="date" name="startDate" placeholder="Rent Start Date" value={formData.startDate} onChange={handleChange} />

      <select name="idType" value={formData.idType} onChange={handleChange}>
        <option value="">Select ID Type</option>
        <option value="aadhaar">Aadhaar</option>
        <option value="pan">PAN</option>
        <option value="other">Other</option>
      </select>

      <input type="text" name="documentNumber" placeholder="ID Document Number" value={formData.documentNumber} onChange={handleChange} />

      {/* File Uploads */}
      <label>ID Proof (any file type)</label>
      <input type="file" name="idProofFile" onChange={handleChange} multiple />

      <label>Rental Agreement (any file type)</label>
      <input type="file" name="rentalAgreement" onChange={handleChange} multiple />

      <label>Renter Profile Photo</label>
      <input type="file" name="profilePhoto" accept="image/*" onChange={handleChange} multiple />

      <button type="submit">Add Property</button>
    </form>
  );
};

export default AddRentalProperty;
