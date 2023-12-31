import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb'

// admin can see all the user what ever he she purchased
export async function GET(){
    const users=await prisma.user.findMany({
        where:{
            role:"USER"
        },
        include:{
            purchased:true
        }
    })

    return NextResponse.json(users,{status:200});
}