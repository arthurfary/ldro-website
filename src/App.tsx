import React from 'react';
import './index.css'
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../src/pages/areaSecreta'
import Home from '../src/pages/home'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
