import { Schema, model, models } from "mongoose";
import Event from "./event.model";

const BookingSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.pre("save", async function(next){
    try{
        const eventExists = await Event.findById(this.eventId);

        if(!eventExists){
            throw new Error("Event not found")
        }

        next();
    }
    catch(error){
        return next(error);
    }
})

BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

const Booking =
  models.Booking || model("Booking", BookingSchema);

export default Booking;