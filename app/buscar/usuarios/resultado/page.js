"use client"
import { v4 as uuidv4 } from 'uuid';

export default async function BuscarUsuarios() {
    async function getUsuarios() {
        const res = await fetch("http://localhost:3000/api/users/buscar")
        const data = await res.json()
        console.log("data", data.users)
        return data.users
    }
    const usuarios = await getUsuarios()
    return (
        <div>
            
        
            <ul>
                <p>busqueda de Usuarios:</p>
                {usuarios.map((usuario) => (
                    <div className="card">
                        <div className="card-body">
                            <ul key={uuidv4()} className="card-title">
                                    <h3 className="font-bold">Nombre: {usuario.name}</h3>
                            </ul>
                            <ul key={uuidv4()} className="card-text">
                                    <h5 className="font-bold">Mail: {usuario.email}</h5>
                            </ul>
                            <ul key={uuidv4()} className="card-text">
                                    <h5 className="font-bold">Edad: {usuario.edad}</h5>
                            </ul>
                            <ul key={uuidv4()} className="card-text">                            
                                <h5 className="font-bold">Ciudad: {usuario.ciudad}</h5>
                            </ul>
                            <ul key={uuidv4()} className="card-text">                            
                                <h5 className="font-bold">Intereses: {usuario.intereses}</h5>
                            </ul>
                        </div>
                    </div>
                ))}
                
            </ul>
        </div>       
    )
}