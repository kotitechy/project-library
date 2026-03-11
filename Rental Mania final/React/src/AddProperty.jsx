import Sidebar from './sidebar';
import Header from './header';
import DashboardContent from './DashboardContent';
import AddRentalProperty from './AddPropertyCard';
import { Outlet } from 'react-router-dom';

function AddProperty(){

    return (
        
        <>

        <div className="App">
            <Header data='Dashboard' />
            <Sidebar />
            <Outlet />
        </div>
        <div className="main-content">
            <div className="properties-container">
                <AddRentalProperty />
            </div>
        </div>
    </>
);
}

export default AddProperty;