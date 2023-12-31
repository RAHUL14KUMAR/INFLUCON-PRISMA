import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb'

//  user of particular id can see what he/she prchased + their complete info
export async function GET(request:Request,{params}:any){
    console.log("req",request)
    console.log("params",params)

    const{id}=params
    console.log("from course id params",id);
    const users=await prisma.user.findUnique({
        where:{
            id:id
        },
        include:{
            purchased:true
        }
    })

    return NextResponse.json(users,{status:200});
}