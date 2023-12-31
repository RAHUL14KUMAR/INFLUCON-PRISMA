import bcrypt from 'bcrypt'
import {NextResponse} from 'next/server'
import prisma from '@/libs/prismadb'

export async function POST(request:Request){
    const body=await request.json();

    const{email}=body

    const user=await prisma.user.findFirst({
        where:{
            email:email
        }
    })


    try{
        return NextResponse.json(user,{
            status:200
        });
    }catch(error){
        return NextResponse.json(error,{
            status:500
        })
    }

    return NextResponse.json(user);
}
