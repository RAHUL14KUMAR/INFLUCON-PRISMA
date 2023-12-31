import bcrypt from 'bcrypt'
import {NextResponse} from 'next/server'
import prisma from '@/libs/prismadb'
import {signIn} from 'next-auth/react'

export async function POST(request:Request){
    const body=await request.json();

    const{name,email,password,role}=body
    const hashedPassword=await bcrypt.hash(password,10);

    const user=await prisma.user.create({
        data:{
            name:name,email:email,hashedPassword:hashedPassword,role:role
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