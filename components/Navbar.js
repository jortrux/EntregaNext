import Link from 'next/link'
//Después de CSS
import './Navbar.css'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid text-white">
                <Link href="/" className='nav-link'>
                    <h1>Clase de Nextjs</h1>
                </Link>
                <ul>
                    <li>
                        <Link href="/" className='nav-link'>Home</Link>
                    </li>
                    <li>
                        <Link href="/SingUp" className='nav-link'>SingUp</Link>
                    </li>
                    <li>
                        <Link href="/SingUp/LogIn" className='nav-link'>LogIn</Link>
                    </li>
                    {/* <li>
                        <Link href="/" className='nav-link'>Buscar</Link>
                    </li> */}
                </ul>
                </div>
        </nav>
    )
}