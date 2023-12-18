"use client"
import React, { useState, useEffect } from 'react';
// Le debo mucho a ivan gio por explicarme otra forma de hacer esto, porque yo me estaba sobre complicando demasiado

export default function BusquedaComercios() {

  const [users, setUsers] = useState([]);
  const [filtro1, setFiltro1] = useState('');
  const [filtro2, setFiltro2] = useState('');
  const [filtro3, setFiltro3] = useState('');
  useEffect(() => {
    cargarComercios();
  }, []);


  const cargarComercios = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/usuariosQ")
      if (!response.ok) {
        throw new Error('Error al cargar los comercios');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };


  const eliminarUser = async (cif) => {
    try {
    const response = await fetch(`http://localhost:3000/api/usuariosQ`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cif }), 
    });

    if (!response.ok) {
        throw new Error('Error al eliminar el comercio');
    }
    await response.json();
    cargarComercios();
    } catch (error) {
    console.error('Error al eliminar el comercio:', error);
    }
  };
  const usersFilter = users.filter(user =>
    (user.name && user.name.includes(filtro1)) && (user.intereses && user.intereses.includes(filtro2)) && (user.ciudad && user.ciudad.includes(filtro3))
  );
  return (
    <div>
      <h1>Buscar Usuarios: </h1>
      <div>
        <input type="text" placeholder="Nombre del usuario" onChange={(e) => setFiltro1(e.target.value)}/>
      </div>    
      <div>
        <input type="text" placeholder="Intereses del usuario" onChange={(e) => setFiltro2(e.target.value)}/>
      </div> 
      <div>   
        <input type="text" placeholder="Ciudad del usuario" onChange={(e) => setFiltro3(e.target.value)}/>
      </div>
        <br></br>
      <div>
        {usersFilter.map((user, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <h1 className="card-title">{user.name}</h1>
              <p className="card-text"><strong>Email:</strong> {user.email}</p>
              <p className="card-text"><strong>Edad:</strong> {user.edad}</p>
              <p className="card-text"><strong>Ciudad:</strong> {user.ciudad}</p>
              <p className="card-text"><strong>Intereses:</strong> {user.intereses}</p>
              {/* <button className="btn btn-danger me-2" onClick={() => eliminarUser(user.name)}>Eliminar</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}