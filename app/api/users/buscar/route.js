import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs';

export async function GET() {
    try{
        const users = JSON.parse(readFileSync("data/users.json"))
        console.log(users)
        return NextResponse.json({users})
    } catch(e){  
        return NextResponse.json({message: "Usuarios no existen...", status: 400})
    }
}

export async function DELETE(request) {
   const data = await request.json()
   try {
        const users = JSON.parse(readFileSync("data/users.json"))
        //console.log(users)
        const usersFIlter = users.filter( users => users.email != data.email) 
        //console.log(usersFIlter)
        writeFileSync("data/users.json", JSON.stringify(usersFIlter))
        return NextResponse.json({message: "Usuario eliminado...", status: 200})
    } catch(e){
        console.log(e)
    }
}