"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function Admin() {
  const params = useParams();
  const [users, setUsers] = useState([]);
  const [filtro, setFiltro] = useState('');
  useEffect(() => {
    cargarUsers();
    setFiltro(params.id)
  }, []);
  const cargarUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/usuariosQ")
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }
  const usersFilter = users.filter(user =>
    (user.intereses && user.intereses.includes(filtro)))
  return (
    <div>
      <h1>Comercios: </h1>
      <br/>
      <div className='container'>
        <div className="card">
          <section>
            <Link href="/Admin/comercio">Editar pagina Comercio</Link>
          </section>
        </div>
      </div>
      <div className='container'>
        <h1>Usuarios interesados:</h1>
        
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
  )
}
