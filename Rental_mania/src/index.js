import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './body';
import Dashboard from './Dashboard';
import History from './History';
import SettingsPage from './SettingsPage';
import SignOut from './signout';
import Register from './Register';
import Login from './Login';
import ForgotPassword from './forgotpass';
import Bills from './Bills';
import Messages from './Messages';
import UpdateProperty from './updatechanges';
import AddProperty from './AddProperty';
import PropertyDetails from './PropertyDetails';
import Profile from './Profile';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route  path='/' element={<Dashboard />} /> 
      <Route path="/home" element={<App />} />
      <Route path="/history" element={<History />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/signout" element={<SignOut />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/bills" element={<Bills />} />
      <Route path="/update" element={<UpdateProperty />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/addproperty" element={<AddProperty />} />
      <Route path="/property" element={<PropertyDetails />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);

