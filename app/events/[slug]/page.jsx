import { NextResponse } from "next/server";
import Image from "next/image";
import BookingsForm from "@/compnents/BookingsForm";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import EventCard from "@/compnents/EventCard";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


const EventDetails = async ({ params }) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`)
  const event = await request.json();


  if(!event){
    return (
        NextResponse.json(
          { message: "Event not found" },
          { status: 404 }
        )
    )
  }

  const similarEvents = await getSimilarEventsBySlug(slug);

  return (
<section id="event">
  <div className="header">
    <h1>Event Description</h1>
    <p>{event.description}</p>
  </div>

  <div className="details">
    <div className="content">
      <Image
        src={event.image}
        alt={event.title}
        width={800}
        height={500}
        className="object-cover rounded-xl"
      />

      <section className="flex-col-gap-2">
        <h2>Overview</h2>
        <p>{event.overview}</p>
      </section>

      <section className="flex-col-gap-2">
        <h2>Event Details</h2>

        <div className="flex-row-gap-2 items-center">
          <Image
            alt="calendar"
            src="/icons/calendar.svg"
            width={17}
            height={17}
            style={{ height: "auto" }}
          />
          <p>{event.date}</p>
        </div>

        <div className="flex-row-gap-2 items-center">
          <Image
            alt="clock"
            src="/icons/clock.svg"
            width={17}
            height={17}
            style={{ height: "auto" }}
          />
          <p>{event.time}</p>
        </div>

        <div className="flex-row-gap-2 items-center">
          <Image
            alt="pin"
            src="/icons/pin.svg"
            width={17}
            height={17}
            style={{ height: "auto" }}
          />
          <p>{event.location}</p>
        </div>

        <div className="flex-row-gap-2 items-center">
          <Image
            alt="mode"
            src="/icons/mode.svg"
            width={17}
            height={17}
            style={{ height: "auto" }}
          />
          <p>{event.mode}</p>
        </div>

        <div className="flex-row-gap-2 items-center">
          <Image
            alt="audience"
            src="/icons/audience.svg"
            width={17}
            height={17}
            style={{ height: "auto" }}
          />
          <p>{event.audience}</p>
        </div>
      </section>
      <div class="agenda">
        <h2>Agenda</h2>
        <ul>
            {JSON.parse(event.agenda[0]).map((item)=>{
                return <li>{item}</li>
            })}
        </ul>
    </div>
    <section class="flex-col-gap-2">
        <h2>About the Organizer</h2>
            <p>{event.organizer}</p>
    </section>
    <div class="flex flex-row gap-1.5 flex-wrap">
        {JSON.parse(event.tags[0]).map((item)=>{
                return <div className = 'pill'>{item}</div>
        })}
    </div>
    </div>

    <BookingsForm eventId={event._id} slug = {event.slug}/>
    
  </div>
  <div class="flex w-full flex-col gap-4 pt-20">
    <h2>Similar Events</h2>
        <div class="events">
            {similarEvents && similarEvents.length > 0 ? (
                similarEvents.map((event)=>{
                    return (
                        <EventCard key = {event._id} {...event}/>
                    )
                })
            ) : (
                <p>No similar events found.</p>
            )}
        </div>
    </div>
</section>
  );
};

export default EventDetails;