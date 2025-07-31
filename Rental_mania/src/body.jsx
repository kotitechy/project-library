import React from 'react';
import Sidebar from './sidebar';
import Header from './header';
import './index.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import MyForm from './test';
import LandingPage from './LandingPage';

function App() {
    return (
        <>
        <div className="App">
            <Header data='Home'/>
            <Sidebar />
        </div>
        
        <div className="main-content">
        <div className="properties-container">
        <LandingPage />
        </div>
        </div>
        </>

    );
}

export default App;