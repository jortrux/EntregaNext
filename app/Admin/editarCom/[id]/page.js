"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {useRouter} from 'next/navigation'
const EditarComercio = () => {
  const [nombre, setNombre] = useState('');
  const [cif, setCif] = useState('');
  const [direccion, setDireccion] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');

  const [comercioOg, setComercioOg] = useState({}); 

  const params = useParams();
  const id = params.id;
  const router = useRouter();
  useEffect(() => {
    const cargarComercio = async () => {
      if (!id) return;
      try {
        const response = await fetch(`/api/comercios/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            router.push(`/404`);
          }
          throw new Error('Error al cargar los datos del comercio');
        }
        const data = await response.json();
        // setComercio(data[0]);
        setComercioOg(data[0]); 
      } catch (error) {
        console.error('Error:', error);
      }
    };
    cargarComercio();
  }, [id]);

 

  const handleSubmit = async (e) => {
    // setComercio({ ...comercio, [e.target.name]: e.target.value });
    const comercio = {
        nombre: nombre,
        cif: cif,
        ciudad: direccion,
        email: email,
        telefono: telefono
    }
    e.preventDefault();
    try {
      const response = await fetch("api/comercios/${id}", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comercio),
      });
      console.log("Response: ", response)
      console.log("Response.ok: ", response.ok)
      if (!response.ok) {
        throw new Error('Error al actualizar el comercio');
      }

      alert('Comercio actualizado con éxito');
      setComercioOg(comercio);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="container">
      <h1>Editar Comercio</h1>
      <div className="card my-4">
        <h2>Información Actual del Comercio</h2>
        <p>Nombre:{comercioOg.nombre}</p>
        <p>CIF:{comercioOg.cif}</p>
        <p>Dirección: {comercioOg.ciudad}</p>
        <p>Email: {comercioOg.email}</p>
        <p>Teléfono: {comercioOg.telefono}</p>
      </div>


      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" id="nombre" name="nombre" placeholder="Nombre:" onChange={(e) => setNombre(e.target.value)}/>
        </div>
        <div>
          <input type="text" id="cif" name="cif" placeholder="CIF:" onChange={(e) => setCif(e.target.value)}/>
        </div>
        <div>
          <input type="text" id="ciudad" name="ciudad" placeholder="Ciudad" onChange={(e) => setDireccion(e.target.value)}/>
        </div>
        <div>
          <input type="email" id="email" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
          <input type="tel" id="telefono" name="telefono" placeholder="telefono" onChange={(e) => setTelefono(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-success">guardar</button>
      </form>
    </div>
  );
};

export default EditarComercio;
