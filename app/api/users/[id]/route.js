
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
    return new NextResponse(JSON.stringify({ message: 'No se encontraron comercios' }), { status: 400 });
  }
}