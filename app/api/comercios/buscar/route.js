import { NextResponse } from 'next/server'
import { readFileSync } from 'fs';

export async function POST(request) {
    const data = await request.json()
    try{
        console.log("comercio: ")
        const comercios = JSON.parse(readFileSync("data/comercios.json"))
        console.log("comercio: ",comercios)
        if (comercios.length > 0) {
            return NextResponse.json({message: comercios, status: 200})
        }else {
            return NextResponse.json({message: "Comercio no existe...", status: 400})
        }
    } catch(e){  
        return NextResponse.json({message: "Comercio no existe...", status: 400})
    }
}