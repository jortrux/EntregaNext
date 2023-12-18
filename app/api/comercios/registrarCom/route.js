import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs';

export async function POST(request) {
    const data = await request.json()
    try{
        const comercios = JSON.parse(readFileSync("data/comercios.json"))
        writeFileSync("data/comercios.json", JSON.stringify([...comercios, data]))
    } catch(e){  
        writeFileSync("data/comercios.json", JSON.stringify([data]))
    }
    return NextResponse.json({message: "Guardando datos..."})
}