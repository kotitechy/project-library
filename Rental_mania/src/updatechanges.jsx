import React, { useState } from 'react';
import './style.css';
import Sidebar from './sidebar';
import Header from './header';

const propertyList = [
  {
    id: 1,
    name: "Sunrise Apartments",
    address: "Hyderabad, TS",
    rent: 18000,
    category: "rental apartment",
    surveyNumber: "SN1234",
    renter_name: "Ravi Kumar"
  },
  {
    id: 2,
    name: "Green Meadows Plot",
    address: "Shamirpet, TS",
    rent: null,
    category: "plot",
    surveyNumber: "SN4321",
    renter_name: ""
  },
  {
    id: 3,
    name: "Ocean View Villa",
    address: "Vizag",
    rent: 25000,
    category: "villa",
    surveyNumber: "SN7890",
    renter_name: "Anita Rao"
  }
];

const UpdateProperty = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [property, setProperty] = useState(null);

  const handleCategorySelect = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setFilteredProperties(propertyList.filter(p => p.category === category));
    setSelectedId('');
    setProperty(null);
  };

  const handlePropertySelect = (e) => {
    const id = parseInt(e.target.value);
    const found = propertyList.find((p) => p.id === id);
    setSelectedId(id);
    setProperty({ ...found });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Updated property:\n${JSON.stringify(property, null, 2)}`);
  };

  return (
    <>
      <div className="App">
        <Header data='Update Property' />
        <Sidebar />
      </div>

      <div className="main-content">
        <div className="properties-container">
          <div className="update-container">
            <h2>Update Property Details</h2>

            {/* Step 1: Category Selection */}
            <label>Select Category:</label>
            <select value={selectedCategory} onChange={handleCategorySelect}>
              <option value="">-- Select Category --</option>
              <option value="rental apartment">Rental Apartment</option>
              <option value="commercial space">Commercial Space</option>
              <option value="plot">Plot</option>
              <option value="villa">Villa</option>
            </select>

            {/* Step 2: Filtered Property Selection */}
            {selectedCategory && (
              <>
                <label>Select Property:</label>
                <select value={selectedId} onChange={handlePropertySelect}>
                  <option value="">-- Select Property --</option>
                  {filteredProperties.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </>
            )}

            {/* Step 3: Update Form */}
            {property && (
              <form className="update-form" onSubmit={handleSubmit}>
  {/* Basic property info */}
  <label>
    Name:
    <input type="text" name="name" value={property.name} onChange={handleChange} />
  </label>

  <label>
    Address:
    <input type="text" name="address" value={property.address} onChange={handleChange} />
  </label>

  <label>
    Rent (₹):
    <input type="number" name="rent" value={property.rent || ''} onChange={handleChange} />
  </label>

  <label>
    Survey Number:
    <input type="text" name="surveyNumber" value={property.surveyNumber} onChange={handleChange} />
  </label>

  {/* Renter Information */}
  <hr />
  <h3>Renter Details</h3>

  <label>
    Renter Name:
    <input type="text" name="renter_name" value={property.renter_name} onChange={handleChange} />
  </label>

  <label>
    Renter Address:
    <input type="text" name="renterAddress" value={property.renterAddress || ''} onChange={handleChange} />
  </label>

  <label>
    Phone Number:
    <input type="text" name="renterPhone" value={property.renterPhone || ''} onChange={handleChange} />
  </label>

  <label>
    Rent Starting Date:
    <input type="date" name="rentStartDate" value={property.rentStartDate || ''} onChange={handleChange} />
  </label>

  {/* Renter Proofs */}
  <hr />
  <h3>Renter Proofs & Agreements</h3>

  <label>
    ID Proof Type:
    <select name="idType" value={property.idType || ''} onChange={handleChange}>
      <option value="">-- Select --</option>
      <option value="aadhaar">Aadhaar</option>
      <option value="pan">PAN</option>
      <option value="other">Other</option>
    </select>
  </label>

  <label>
    ID Document Number:
    <input type="text" name="documentNumber" value={property.documentNumber || ''} onChange={handleChange} />
  </label>

  <label>
    ID Proof Upload:
    <input type="file" name="idProofFile" onChange={handleChange} multiple />
  </label>

  <label>
    Rental Agreement Upload:
    <input type="file" name="rentalAgreement" onChange={handleChange} multiple />
  </label>

  <label>
    Renter Profile Photo:
    <input type="file" name="profilePhoto" accept="image/*" onChange={handleChange} multiple />
  </label>

  <button type="submit">Update</button>
</form>

            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProperty;
