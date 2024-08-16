import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Heatmap from './pages/Heatmap.jsx';
import Map from './pages/Map.jsx';

function App (){
  return (
    <Router>
        <>
            <nav className='navbar'>
                <ul className='navBar-ul'>
                    <li className='navBar-ul-li'><Link className="link-btn" to="/">Heatmap</Link></li>
                    <li className='navBar-ul-li'><Link className="link-btn" to="/map">Mapa Interactivo</Link></li>
                </ul>
            </nav>
            <main>
                <Routes>
                    <Route  path="/" element={<Heatmap />} />
                    <Route  path="/map" element={<Map />} />
                </Routes>
            </main>
        </>
    </Router>
  );
}

export default App;
