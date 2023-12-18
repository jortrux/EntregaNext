"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function EditarUser(){
  const [nombre, setNombre] = useState('');
  const [password, setpassword] = useState('');
  const [ciudad, setciudad] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');

  const [userOg, setuserOg] = useState({}); 

  const params = useParams();
  const id = params.id;
  useEffect(() => {
    const cargaruser = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        // setuser(data[0]);
        setuserOg(data[0]); 
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    cargaruser();
  }, [id]);

 

  const handleSubmit = async (e) => {
    const user = {
        nombre: nombre,
        password: password,
        ciudad: ciudad,
        email: email,
        telefono: telefono
    }
    e.preventDefault();
    try {
      const response = await fetch("api/users/${id}", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      console.log("Response: ", response)
      console.log("Response.ok: ", response.ok)
      if (!response.ok) {
        throw new Error('Error al actualizar el user');
      }

      alert('user actualizado con éxito');
      setuserOg(user);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Bienvenido {userOg.name}!!</h1>
        <div className="card">
          <section>
            <Link href="/buscar/usuarios">Buscar user</Link>
          </section>
        </div>
        <br/>
    <div>
      <h1>Editar perfil</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" id="nombre" name="nombre" value={userOg.name} placeholder="Nombre:" onChange={(e) => setNombre(e.target.value)}/>
        </div>
        <div>
          <input type="text" id="password" name="password" vaue={userOg.password} placeholder="password:" onChange={(e) => setpassword(e.target.value)}/>
        </div>
        <div>
          <input type="text" id="ciudad" name="ciudad" vaue={userOg.ciudad} placeholder="Ciudad" onChange={(e) => setciudad(e.target.value)}/>
        </div>
        <div>
          <input type="email" id="email" name="email" vaue={userOg.email} placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
          <input type="tel" id="telefono" name="telefono" vaue={userOg.telefono} placeholder="telefono" onChange={(e) => setTelefono(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-success">guardar</button>
      </form>
    </div>
    </div>
  );
};
