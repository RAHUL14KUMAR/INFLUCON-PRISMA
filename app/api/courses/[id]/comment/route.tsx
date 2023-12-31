import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb'

export async function POST(request:Request,{params}:any){
    const body=await request.json()
    const {id}=params

    const{rating,comment}=body;

    const comments=await prisma.comment.create({
        data:{
            rating,comment,courseId:id
        }
    })

    return NextResponse.json(`you comment on this course with id->${id}`,{
        status:201
    })
}