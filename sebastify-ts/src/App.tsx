import React from 'react';
import './App.css';
import HomePage from './component/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutUs from './component/AboutUs';
import Login from './component/Login';
import Register from './component/Register';


function App() {
  return (

    <div className="tilt-neon">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/AboutUs' element={<AboutUs />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/Register' element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
