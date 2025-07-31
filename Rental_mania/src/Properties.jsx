import './style.css';
import App from './body';
const property = [
  {
    name: "Sunrise Apartments",
    category: "rental apartment",
    city_village: "Hyderabad",
    rental_price_per_month: 18000
  },
  {
    name: "Prime Commercial Plaza",
    category: "commercial space",
    city_village: "Secunderabad",
    rental_price_per_month: 85000
  },
  {
    name: "Green Meadows Plot",
    category: "plot",
    city_village: "Shamirpet",
    rental_price_per_month: null
  }
];


function Properties() {
  return (
    <>
    <App />
    <div className="main-content">
    <div className="properties-container">
      <h2>🏠 Property Listings</h2>
      <table border="1" cellSpacing="0" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>City/Village</th>
            <th>Rental Price (₹)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {property.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.city_village}</td>
              <td>{item.rental_price_per_month ? `₹${item.rental_price_per_month}` : "-"}</td>
              <td style={{ color: item.rental_price_per_month ? "green" : "red" }}>
                {item.rental_price_per_month ? "Rented" : "Not Rented"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="properties-container">
      <h2>🏠 Property Listings</h2>
      <table border="1" cellSpacing="0" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>City/Village</th>
            <th>Rental Price (₹)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {property.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.city_village}</td>
              <td>{item.rental_price_per_month ? `₹${item.rental_price_per_month}` : "-"}</td>
              <td style={{ color: item.rental_price_per_month ? "green" : "red" }}>
                {item.rental_price_per_month ? "Rented" : "Not Rented"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
 
    </div>
    </>
  );
}

export default Properties;
