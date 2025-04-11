// src/App.js
// src/App.js
import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Panel from './components/Panel';
import Inventario from './components/Inventario';

// Escoge el Router según el entorno
const Router =
  process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/inventario" element={<Inventario />} />
      </Routes>
    </Router>
  );
}

export default App;
