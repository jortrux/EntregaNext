
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function PUT() {
  const filePath = path.join(process.cwd(), 'data', 'comercios.json');
}