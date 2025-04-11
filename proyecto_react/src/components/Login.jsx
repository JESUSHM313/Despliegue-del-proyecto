import React, { useState } from 'react';
import './Login.css';

const LoginForm = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append('usuario', usuario);
    formData.append('contraseña', contraseña);

    try {
      const response = await fetch('http://localhost:8080/login/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
        credentials: 'include'
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        data = null;
      }

      if (response.ok && data?.message === "Autenticación satisfactoria") {
        setSuccess('Autenticación exitosa, redirigiendo al panel...');
        setError('');

        // Redirigir después de mostrar el mensaje de éxito
        setTimeout(() => {
          window.location.href = 'http://localhost:8080/login/panel.jsp';
        }, 2000); // 2 segundos de espera antes de redirigir
      } else {
        setError(data?.message || 'Credenciales incorrectas o error en la autenticación');
        setSuccess('');
      }
    } catch (err) {
      console.error('Error en la conexión:', err);
      setError('Error al conectar con el servidor');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginForm;

