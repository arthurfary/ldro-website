import React, { useEffect, useState } from 'react';
import './index.css'
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../src/pages/areaSecreta'
import Home from '../src/pages/home'
import BackendPage from './pages/backEndPages/backend';


function App() {
  const [token, setToken] = useState({});

  if (Object.keys(token).length !== 0) { // this weird if is so token is allways a type dict/JSON obj, refactor later
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data: JSON = JSON.parse(sessionStorage.getItem('token') || '') // this needs to have and more explicit type to remove the || ''
      setToken(data)
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path='/backend' element={Object.keys(token).length !== 0 ? <BackendPage /> : null} /> {/* ugly if*/}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
