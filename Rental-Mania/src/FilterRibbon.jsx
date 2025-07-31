import React, { useState } from 'react';

const propertyData = {
  'rental apartment': ['Sunrise Apartments', 'Galaxy Residency', 'Golden View Flats'],
  'commercial space': ['Prime Commercial Plant', 'Elite Office Tower', 'Business Bay'],
  'plot': ['Green Meadows Plot', 'Tech Park Plot', 'Urban Plot', 'Greenfield Plot'],
  'villa': ['Lakeview Villas', 'Hilltop Mansion', 'Country Side Bungal'],
  'others': ['Metro Heights', 'Riverfront Estate', 'Mall Complex', 'Corporate Hub']
};

const FilterRibbon = ({ onFilterApply }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const handleApply = () => {
    if (!selectedCategory || !selectedProperty || !selectedDate) {
      alert("Please select category, property, and date.");
      return;
    }
  }

  const propertyOptions = selectedCategory ? propertyData[selectedCategory] : [];

  return (
    <div className="filter-ribbon">
      <select value={selectedCategory} onChange={e => {
        setSelectedCategory(e.target.value);
        setSelectedProperty('');
      }}>
        <option value="">Select Category</option>
        {Object.keys(propertyData).map((cat, idx) => (
          <option key={idx} value={cat}>{cat}</option>
        ))}
      </select>

      <select
        value={selectedProperty}
        onChange={e => setSelectedProperty(e.target.value)}
        disabled={!selectedCategory}
      >
        <option value="">Select Property</option>
        {propertyOptions.map((prop, i) => (
          <option key={i} value={prop}>{prop}</option>
        ))}
      </select>
      <input
        type="date"
        value={selectedDate}
        onChange={e => setSelectedDate(e.target.value)}
      />


      <button onClick={handleApply}>Fetch</button>
    </div>
  );
};

export default FilterRibbon;
