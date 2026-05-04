'use server';

import connectDB from "../mongodb";
import Event from "@/database/event.model";

export const getSimilarEventsBySlug = async function (slug){
    try{

        await connectDB();

        const event = await Event.findOne({slug});

        const similarEvent = await Event.find({_id : {$ne: event._id}, tags:{$in : event.tags}}).lean();

        return similarEvent;

    }catch{
        return [];
    }
}