import React from 'react';
import './index.css' 
import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Backend from '../src/pages/areaSecreta'
import Home from '../src/pages/home'

import Calendar from './components/calendar/Calendar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/backend" element={<Backend />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
