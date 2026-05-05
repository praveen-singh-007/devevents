import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/database/booking.model";

export async function bookEvent({eventId, email, slug}){

    try{
        await connectDB();

        const booking = await Booking.create({ eventId, email, slug });

        return NextResponse.json(
            { message: "Booking successful", booking },
            { status: 201 }
        );

    }catch(error){
        NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }

}
