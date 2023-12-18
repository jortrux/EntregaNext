'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

function SingUp(){
	
	//definir todas las variables necesarias
	const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
	const [edad, setEdad] = useState("")
    const [ciudad, setCiudad] = useState("")
    const [intereses, setIntereses] = useState("")
    const [ofertas, setOfertas] = useState("")
    const [rol, setRol] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
            name: name,
            edad: edad,
            ciudad: ciudad,
            intereses: intereses,
            ofertas: ofertas,
            rol: rol
        }
        setRol("user")
        //una vez se ha terminado el formulario, te lleva a la pagina de inicio
        fetch("/api/signup", {
            method: "POST",
            headers: {
            
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
        
        
        router.push("/")
    }

    return(
        <div>
            <form onSubmit={handleSubmit} class="row">
                {/* <!-- nombre y correo --> */}
                <input onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="nombre"/>
                
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Correo" required="" />
                {/* <!-- contraseña --> */}
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Contraseña" required="" />
                {/* <!-- nombre y correo --> */}
                <input onChange={(e) => setEdad(e.target.value)} type="text" name="edad" placeholder="edad"/>

                <input onChange={(e) => setCiudad(e.target.value)} type="text" name="ciudad" placeholder="ciudad"/>   

                <input onChange={(e) => setIntereses(e.target.value)} type="text" name="intereses" placeholder="intereses"/>
                <div>
                    <input onChange={(e) => setOfertas(e.target.checked)} type="checkbox" checked={ofertas}/>
                    <label>Permitir recibir ofertas</label>  
                </div>

                {/* <!-- boton de "Registro" y "Borrar" --> */}
                <button type="submit" id="registrar" class="col">Registrar</button>
                
                <input type="reset" id="borrar" value="Borrar" class="col"/>
            
            
            </form>
        </div>       
    )
}

export default SingUp;