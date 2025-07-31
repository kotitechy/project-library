import { Navigate, useNavigate, Link } from "react-router-dom";
import Avatar from './default-avatar.png';

const Header = (props) => {
    const Navigate = useNavigate()
    function login(){
       Navigate('/Login')
    }
    return (
        <header className="header">
            <div>
                <h1 className="header-title">{props.data}</h1>
            </div>
            
            <div className="header-actions">
                <div className="search-container">
                    <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input type="text" className="search-input" placeholder="Search here..." />
                </div>
                
                <div className="language-selector">
                    <div className="flag">🇮🇳</div>
                    <span>India</span>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z"></path>
                    </svg>
                </div>
                
                <div className="notification-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
                            <img src='./default-avatar.png' alt='error'></img>
                        </path>
                    </svg>
                    <div className="notification-badge"></div>
                </div>
                <Link to='/profile'>

<Link to="/profile">
  <img src={Avatar} alt="Profile" className="user-avatar" />
</Link>
                </Link>
            </div><br />
        </header>
    );
};

export default Header;