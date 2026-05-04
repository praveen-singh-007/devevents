import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Booking from "@/database/booking.model";

export async function POST(req) {

    try {

        await connectDB();

        const body = await req.json();

        const { eventId, email } = body;

        // Check if already registered
        const existingBooking =
            await Booking.findOne({
                eventId,
                email,
            });

        if (existingBooking) {

            return NextResponse.json(
                {
                    error:
                        "You have already registered for this event.",
                },
                {
                    status: 409,
                }
            );
        }

        // Create booking
        const booking =
            await Booking.create(body);

        return NextResponse.json(
            booking,
            {
                status: 201,
            }
        );

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