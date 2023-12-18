"use client"
import React, { useState } from 'react';
import {useRouter} from 'next/navigation'
// import '@/globals.css'

const RegistroComercio = () => {
  const [nombre, setNombre] = useState('');
  const [cif, setCif] = useState('');
  const [direccion, setDireccion] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rol, setRol] = useState('');

  const router = useRouter();


  const handleSubmit = async(e) => {
    e.preventDefault();
    const comercio = {
        nombre: nombre,
        cif: cif,
        ciudad: direccion,
        email: email,
        telefono: telefono
    }
    
    const user = {
      name: nombre,
      email: email,
      password: cif,
      rol: "comercio"
    }
    //una vez se ha terminado el formulario, te lleva a la pagina de inicio
    fetch("/api/comercios/registrarCom", {
        method: "POST",
        headers: {
        
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(comercio)
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
    
    fetch("/api/signup", {
        method: "POST",
        headers: {
        
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
          .then((res) => res.json())
          .then((data) => console.log(data))
    router.push("/Admin")
}
  return (
    
        <form onSubmit={handleSubmit}>
             <h1>Registra un comercio:</h1>           
            <div>
            <input onChange={(e) => setNombre(e.target.value)} type="text" name="name" placeholder="nombre" required=""/>
            </div>
            <div>
            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Correo" required="" />
            </div>
            <div>
            <input onChange={(e) => setCif(e.target.value)} type="text" name="CIF" placeholder="CIF" required="" />
            </div>
            <div>
            <input onChange={(e) => setDireccion(e.target.value)} type="text" name="direccion" placeholder="direccion" required=""/>
            </div>
            <div>
            <input onChange={(e) => setTelefono(e.target.value)} type="text" name="telefono" placeholder="telefono" required=""/>   
            </div>
            {/* <!-- boton de "Registro" y "Borrar" --> */}
            <button type="submit" id="registrar">Registrar</button>
            <input type="reset" id="borrar" value="Borrar"/>
         </form>
  );
};


export default RegistroComercio;
