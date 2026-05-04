import Image from "next/image";
import Link from "next/link";


const EventCard = ({title, image, slug, location, date, time}) => {
  return (
    <Link href={`/events/${slug}`} id="event-card">
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className="poster"
      />

      <p className="title">{title}</p>

      <div className="flex flex-row gap-2">
        <Image
          alt="location"
          width={14}
          height={14}
          src="/icons/pin.svg"
        />

        <p>{location}</p>
      </div>

      <div className="datetime">
        <div>
          <Image
            alt="date"
            width={14}
            height={14}
            src="/icons/calendar.svg"
          />

          <p>{date}</p>
        </div>

        <div>
          <Image
            alt="time"
            width={14}
            height={14}
            src="/icons/clock.svg"
          />

          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;