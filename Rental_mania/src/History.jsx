
import FilterRibbon from './FilterRibbon';
import Sidebar from './sidebar';
import Header from './header';

function History(){

    return (
        <>
        <div className="App">
            <Header data='History'/>
            <Sidebar />
        </div>
        
        <div className="main-content">
        <div className="properties-container">
        <FilterRibbon />
        </div>
        </div>
        </>

    );
}

export default History;