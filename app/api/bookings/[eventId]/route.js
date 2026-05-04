import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/mongodb";
import Booking from "@/database/booking.model";

export async function GET(req, { params }) {

    try {

        await connectDB();

        const { eventId } = await params;

        const totalBookings =
            await Booking.countDocuments({
                eventId: new mongoose.Types.ObjectId(eventId),
            });

        return NextResponse.json({
            totalBookings,
        });

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