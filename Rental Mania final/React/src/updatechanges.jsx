import React, { useState, useEffect } from 'react';
import './style.css';
import Sidebar from './sidebar';
import Header from './header';
import backend_url from './sec';

const UpdateProperty = () => {
  const [propertyList, setPropertyList] = useState([]);        // All properties from backend
  const [filteredProperties, setFilteredProperties] = useState([]); // Filtered by category
  const [selectedCategory, setSelectedCategory] = useState('');     // Selected category
  const [selectedId, setSelectedId] = useState('');                 // Selected property ID
  const [selectedProperty, setSelectedProperty] = useState(null);   // Property to edit

  // ✅ Fetch all properties from backend
  useEffect(() => {
    fetch(`${backend_url}/properties`)
      .then((response) => response.json())
      .then((data) => setPropertyList(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // ✅ Handle category selection
  const handleCategorySelect = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setFilteredProperties(propertyList.filter((p) => p.category === category));
    setSelectedId('');
    setSelectedProperty(null);
  };

  // ✅ Handle property selection
  const handlePropertySelect = (e) => {
    const id = parseInt(e.target.value);
    const found = propertyList.find((p) => p.id === id);
    setSelectedId(id);
    setSelectedProperty({ ...found });
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProperty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedProperty || !selectedProperty.id) {
    alert('Please select a property to update.');
    return;
  }

  try {
    const formData = new FormData();

    // Append text fields
    for (const key in selectedProperty) {
      formData.append(key, selectedProperty[key]);
    }

    // Append file inputs
    const idProofFiles = e.target.idProofFile.files;
    const rentalAgreementFiles = e.target.rentalAgreement.files;
    const profilePhotos = e.target.profilePhoto.files;

    for (let file of idProofFiles) formData.append('idProofFile', file);
    for (let file of rentalAgreementFiles) formData.append('rentalAgreement', file);
    for (let file of profilePhotos) formData.append('profilePhoto', file);

    const response = await fetch(`${backend_url}/uproperty/${selectedProperty.id}/`, {
      method: 'POST', // or PUT if your backend expects
      body: formData, // send FormData
    });

    const updated = await response.json();

    if (response.ok) {
      alert('✅ Property updated successfully!');
      setPropertyList((prevList) =>
        prevList.map((p) => (p.id === updated.id ? updated : p))
      );
      e.target.reset(); // clear file inputs
    } else {
      alert('❌ Failed to update property.');
      console.error('Failed to update property:', updated);
    }
  } catch (error) {
    console.error('🚨 Error updating property:', error);
    alert('An error occurred while updating property.');
  }
};

  return (
    <>
      <div className="App">
        <Header data="Update Property" />
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

            {/* Step 2: Property Selection */}
            {selectedCategory && (
              <>
                <label>Select Property:</label>
                <select value={selectedId} onChange={handlePropertySelect}>
                  <option value="">-- Select Property --</option>
                  {filteredProperties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </>
            )}

            {/* Step 3: Update Form */}
            {selectedProperty && (
              <form className="update-form" onSubmit={handleSubmit}>
                {/* Basic Info */}
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={selectedProperty.name || ''}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Address:
                  <input
                    type="text"
                    name="address"
                    value={selectedProperty.address || ''}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Rent (₹):
                  <input
                    type="number"
                    name="rent"
                    value={selectedProperty.rent || ''}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Survey Number:
                  <input
                    type="text"
                    name="surveyNumber"
                    value={selectedProperty.surveyNumber || ''}
                    onChange={handleChange}
                  />
                </label>

                {/* Renter Info */}
                <hr />
                <h3>Renter Details</h3>

                <label>
                  Renter Name:
                  <input
                    type="text"
                    name="renter_name"
                    value={selectedProperty.renter_name || ''}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Renter Address:
                  <input
                    type="text"
                    name="renterAddress"
                    value={selectedProperty.renterAddress || ''}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Phone Number:
                  <input
                    type="text"
                    name="renterPhone"
                    value={selectedProperty.renterPhone || ''}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Rent Starting Date:
                  <input
                    type="date"
                    name="rentStartDate"
                    value={selectedProperty.rentStartDate || ''}
                    onChange={handleChange}
                  />
                </label>

                {/* Renter Proofs */}
                <hr />
                <h3>Renter Proofs & Agreements</h3>

                <label>
                  ID Proof Type:
                  <select
                    name="idType"
                    value={selectedProperty.idType || ''}
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
                    value={selectedProperty.documentNumber || ''}
                    onChange={handleChange}
                  />
                </label>

                {/* File Inputs (optional) */}
                <label>
                  ID Proof Upload:
                  <input type="file" name="idProofFile" multiple />
                </label>

                <label>
                  Rental Agreement Upload:
                  <input type="file" name="rentalAgreement" multiple />
                </label>

                <label>
                  Renter Profile Photo:
                  <input type="file" name="profilePhoto" accept="image/*" multiple />
                </label>

                <button type="submit">Update Property</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProperty;
