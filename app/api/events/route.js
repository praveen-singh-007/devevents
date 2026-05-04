import { NextResponse } from "next/server";
import {v2 as cloudinary} from "cloudinary";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

export async function POST(req){
    try{
        await connectDB();

        const formData = await req.formData();

        const event = Object.fromEntries(formData.entries());
        
        const file = formData.get("image")

        if (!file){
            return NextResponse.json({ error: "Image file is required" }, { status: 400 });
        }

        let tags = JSON.parse(formData.get("tags"))

        const bufferArray = await file.arrayBuffer();

        const buffer = Buffer.from(bufferArray);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }).end(buffer);
        });

        event.image = uploadResult.secure_url || uploadResult.url;

        const createdEvent = await Event.create({...event, tags: tags});


        return NextResponse.json(createdEvent, { status: 201 });

    }catch(error){

        return NextResponse.json(
  {
    error: error.message,
  },
  {
    status: 500,
  }
);
    }
}

export async function GET(req){
    try{
        await connectDB();

        const events = await Event.find().sort({ createdAt: -1 });

        return NextResponse.json(events, { status: 200 });
    } catch (error) {

        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}