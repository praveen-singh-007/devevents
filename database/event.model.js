import { Schema, model, models } from "mongoose";

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    overview: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    mode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      lowercase: true,
      required: true,
    },

    audience: {
      type: String,
      required: true,
    },

    agenda: {
      type: [String],
      required: true,
    },

    organizer: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug before saving
EventSchema.pre("save", async function () {
  if (this.title) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  // normalize date
  if (this.date) {
    this.date = new Date(this.date)
      .toISOString()
      .split("T")[0];
  }
});

const Event =
  models.Event || model("Event", EventSchema);

export default Event;