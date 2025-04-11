import React, { useState } from 'react';

const Inventario = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const agregarItem = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append('accion', 'agregar');
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);

    try {
      const response = await fetch('http://localhost:8080/login/inventario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(data.message);  // Muestra el mensaje recibido desde el backend
      } else {
        setMensaje('Ocurrió un error: ' + data.message);
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
    <div>
      <h2>Agregar Ítem al Inventario</h2>
      {mensaje && <p style={{ color: mensaje.includes("exitosamente") ? 'green' : 'red' }}>{mensaje}</p>}
      <form onSubmit={agregarItem}>
        <div>
          <label>Nombre del ítem:</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input 
            type="text" 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Agregar Ítem</button>
      </form>
    </div>
  );
};

export default Inventario;
