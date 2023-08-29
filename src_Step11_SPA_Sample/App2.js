// src/App2.js

import { Routes, Route, Link, NavLink} from 'react-router-dom';
import { Home, About, NotFound} from './pages2';

import './css/bootstrap.css';

function App2() {
    return (
      <div className="container">
        <h1>React Router Test</h1>
        <ul className='nav nav-pills'>
            {/* NavLink 는 active 클래스를 자동으로 처리해 준다. */}
            <li className='nav-item'><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className='nav-item'><NavLink className="nav-link" to="/about">About</NavLink></li>
        </ul>
        <Routes>
            <Route path='/' Component={Home}/>
            <Route path='/about' Component={About}/>
            <Route path='/*' Component={NotFound}/>
        </Routes>
      </div>
    );
}

export default App2;