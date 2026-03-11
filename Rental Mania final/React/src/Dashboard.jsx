import Sidebar from './sidebar';
import Header from './header';
import DashboardContent from './DashboardContent';
import './index.css';
import { Link, Outlet } from 'react-router-dom';
import StatsCard from './StatsCard';
import { useEffect, useState } from 'react';
import backend_url from './sec';

function Dashboard() {
 
  const [property, setProperty] = useState([]);

  useEffect(() => {
    fetch(`${backend_url}/properties`)
      .then((response) => response.json())
      .then((data) => setProperty(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

 return (
        <>
            <div className="App">
                <Header data='Properties' />
                <Sidebar />
                <Outlet />
            </div>
            <div className="main-content">
                <div className="properties-container">

                    <Link to='/addproperty'>
                        <StatsCard
                            iconBg="#dbeafe"
                            className='new'
                            iconSvg={
                                <svg width="24" height="24" fill="none" stroke="#3b82f6" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 4v16m8-8H4" />
                                </svg>
                            }
                            value="Add"
                            title="New Property"
                        />
                    </Link>

                    {property.map((prop) => (
                        <Link
                            key={prop.id}
                            to={`/property`}
                            state={prop}
                            className="property-link"
                        >
                            <DashboardContent data={prop} />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Dashboard;
