
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const filePath = path.join(process.cwd(), 'data', 'users.json');

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(data);
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } else {
    return new NextResponse(JSON.stringify({ message: 'No se encontraron comercios' }), { status: 404 });
  }
}
export async function DELETE(req) {
    const { password } = await req.json();

    const filePath = path.join(process.cwd(), 'data', 'users.json');

    if (fs.existsSync(filePath)) {
        try {
            let users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            users = users.filter(user => user.password !== password);
            fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');

            // Crear la respuesta y configurar el cuerpo y estado
            return new NextResponse(JSON.stringify({ message: 'Comercio eliminado con exito' }), { status: 200 });
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            return new NextResponse(JSON.stringify({ message: 'Error interno del servidor' }), { status: 500 });
        }
    } else {
        return new NextResponse(JSON.stringify({ message: 'Archivo no encontrado' }), { status: 404 });
    }
}
