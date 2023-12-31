import {NextResponse} from 'next/server'
import prisma from '@/libs/prismadb'

export async function POST(request:Request){
    const body=await request.json();

    const {userId,courseId}=body
    try{
        const existingUser = await prisma.user.findUnique({
            where: {id:userId},
        });
        const existingCourse = await prisma.course.findUnique({
            where: { courseid: courseId },
        });

        if(!existingCourse||!existingUser){
            return NextResponse.json("courses or user not found",{
                status:404
            })
        }
        const purchased=await prisma.courseUser.create({
            data:{
                courseId,userId,courseDescription:[existingCourse]
            }
        })
        return NextResponse.json(purchased,{
            status:200
        })

    }catch(error){
        return NextResponse.json(error,{
            status:500
        })
    }
}