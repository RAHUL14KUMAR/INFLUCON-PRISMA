import {NextResponse} from 'next/server'
import prisma from '@/libs/prismadb'

// video can add to the particular course
export async function POST(request:Request,{params}:any){
    const body=await request.json();

    const{id}=params
    console.log("from course id params",params);

    const {title,description,url}=body
    
    const course=await prisma.course.findUnique({
        where:{
            courseid:id
        }
    })
    if(course){
        const video=await prisma.video.create({
            data:{
                title,description,url,courseId: id
            }
        })
        
        return NextResponse.json(video,{
            status:200
        });
    }else{
        return NextResponse.json(`course with ${id} is not found`,{
            status:404
        });
    }
}


// get all course information including its video also
export async function GET(request:Request,{params}:any){
    console.log("req",request)
    console.log("params",params)

    const{id}=params
    console.log("from course id params",id);

    const course=await prisma.course.findUnique({
        where:{
            courseid:id
        },
        include: {
            videos: true,
            comments:true
        },
    })
    if(course){
        return NextResponse.json(course,{
            status:200
        });
    }else{
        return NextResponse.json(`course with ${id} is not found`,{
            status:404
        });
    }
}