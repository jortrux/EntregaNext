import Link from 'next/link'
export default function Admin() {
  return (
    <div>
      <h1>Bienvenido admin</h1>
        <div className="card">
          <section>
            <Link href="/buscar/comercios">Buscar Comercio</Link>
          </section>
          <section>
            <Link href="/Admin/registrarCom">Registrar Comercio</Link>
          </section>
          <section>
            <Link href="/buscar/usuarios">Buscar Usuario</Link>
          </section>
        </div>
    </div>
  )
}
