"use client"
import React, { useState, useEffect } from 'react';
// Le debo mucho a ivan gio por explicarme otra forma de hacer esto, porque yo me estaba sobre complicando demasiado

export default function BusquedaComercios() {

  const [comercios, setComercios] = useState([]);
  const [filtro1, setFiltro1] = useState('');
  const [filtro2, setFiltro2] = useState('');
  const [filtro3, setFiltro3] = useState('');
  useEffect(() => {
    cargarComercios();
  }, []);


  const cargarComercios = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/comercios")
      if (!response.ok) {
        throw new Error('Error comercios');
      }
      const data = await response.json();
      setComercios(data);
    } catch (error) {
      console.error(error);
    }
  };


  const eliminarComercio = async (cif) => {
    try {
    const response = await fetch(`http://localhost:3000/api/comercios`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cif }), 
    });

    if (!response.ok) {
        throw new Error('Error eliminar');
    }
    await response.json();
    cargarComercios();
    } catch (error) {
    console.error('Error eliminar comercio:', error);
    }
  };
  const comerciosFilter = comercios.filter(comercio =>
    (comercio.ciudad && comercio.ciudad.includes(filtro1)) && (comercio.cif && comercio.cif.includes(filtro2)) && (comercio.nombre && comercio.nombre.includes(filtro3))
  );
  return (
    <div>
      <h1>Buscar Comercios: </h1>
      <div>
        <input type="text" placeholder="Ciudad del negocio" onChange={(e) => setFiltro1(e.target.value)}/>
      </div>    
      <div>
        <input type="text" placeholder="CIF del negocio" onChange={(e) => setFiltro2(e.target.value)}/>
      </div> 
      <div>   
        <input type="text" placeholder="Nombre del negocio" onChange={(e) => setFiltro3(e.target.value)}/>
      </div>
        <br></br>
      <div>
        {comerciosFilter.map((comercio, index) => (
          <div key={index} className="card">
            <div className="card-body">
              <h1 className="card-title">{comercio.nombre}</h1>
              <p className="card-text"><strong>Email:</strong> {comercio.email}</p>
              <p className="card-text"><strong>Teléfono:</strong> {comercio.telefono}</p>
              <p className="card-text"><strong>CIF:</strong> {comercio.cif}</p>
              <p className="card-text"><strong>Dirección:</strong> {comercio.ciudad}</p>
              <button className="btn btn-danger me-2" onClick={() => eliminarComercio(comercio.cif)}>Eliminar</button>
              <button className="btn btn-secondary" onClick={() => window.location.href = `/Admin/editarCom/${comercio.cif}`}>Editar</button>
              <button className="btn btn-success me-2">Añadir Reseña</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}