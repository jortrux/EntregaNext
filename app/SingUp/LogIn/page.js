"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //una vez se ha terminado el formulario, te lleva a la pagina de inicio
    const redirigir = (code) => {
        console.log("Code: ", code.message)
        if (code.status == 200 && code.message.rol==="admin") {
            router.push("/Admin")
        }else if(code.status==200 && code.message.rol==="comercio"){
            router.push(window.location.href = `/comercio/${code.message.name}`)
        }else if(code.status==200){
            router.push(window.location.href = `/loged/${code.message.name}`)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
        }
        //abre el txt para comprobar que la contraseña es correcta
        fetch("/api/signin", {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
           .then((res) => res.json())
           
           .then((data) => redirigir(data))
    }


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Correo Electrónico" required="" />
                </div>
                <div>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Contraseña" x-model="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div>
                    <Link href="/SingUp">Crear una cuenta</Link>
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}