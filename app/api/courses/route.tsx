import {NextResponse} from 'next/server'
import prisma from '@/libs/prismadb'

// add new courses excluding its video part
export async function POST(request:Request){
    const body=await request.json();
    const{courseName,courseDescription,creatorDescription}=body
    const course=await prisma.course.create({
        data:{
            courseName,courseDescription,creatorDescription
        }
    })
    try{
        return NextResponse.json(course,{
            status:200
        });
    }catch(error){
        return NextResponse.json(error,{
            status:500
        })
    }
}

// get all courses in the dashboard
export async function GET(){ 
    const course=await prisma.course.findMany()
    console.log(course);
    try{
        return NextResponse.json(course,{
            status:200
        });
    }catch(error){
        return NextResponse.json(error,{
            status:500
        })
    }
}

