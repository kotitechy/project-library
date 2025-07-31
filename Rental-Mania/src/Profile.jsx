import { Link } from 'react-router-dom';
import defaultAvatar from './default-avatar.png';

const Profile = () => {
  const user = {
    name: "Shiva Charan",
    email: "shiva@example.com",
    phone: "9876543210",
    country: "India",
    state: "Telangana",
    city: "Hyderabad",
    purpose: "Rental",
    password: "********"
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="title">Profile</h2>
        <img src={defaultAvatar} alt="Profile" className="avatar" />

        <div className="profile-grid">
          <div><strong>Full Name:</strong> {user.name}</div>
          <div><strong>Email:</strong> {user.email}</div>
          <div><strong>Phone:</strong> {user.phone}</div>
          <div><strong>Country:</strong> {user.country}</div>
          <div><strong>State:</strong> {user.state}</div>
          <div><strong>City:</strong> {user.city}</div>
          <div><strong>Purpose:</strong> {user.purpose}</div>
        </div>

        <div className="profile-actions">
          <Link to='/'>
          <button className="btn update">Home</button>
          </Link>
          <Link to='/settings'>
          <button className="btn update">Update Profile</button>
          </Link>
          <Link to='/forgot'>
          <button className="btn reset">Reset Password</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
