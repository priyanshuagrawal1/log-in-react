import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './login';
import { Recover } from './recover';
import { Signup } from './signup';
import { Welcomepage } from './welcomepage';
import Right from './right';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recover" element={<Recover />} />
      <Route path="/right" element={<Right />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/welcome" element={<Welcomepage />} />
    </Routes>
  );
}

export default App;
