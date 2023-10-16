import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Routes , Route, Link } from 'react-router-dom';
import CurrentLocation from './components/currentLocation/CurrentLocation';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<CurrentLocation/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
