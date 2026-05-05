'use client'

import { useState, useEffect } from "react";

const BookingsForm = ({ eventId, slug }) => {

    const [people, setPeople] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {

        const fetchBookings = async () => {
            try {

                const response = await fetch(
                    `/api/bookings/${eventId}`
                );

                const data = await response.json();

                setPeople(data.totalBookings);

            } catch (error) {
                return error;
            }
        };

        if (eventId) {
            fetchBookings();
        }

    }, [eventId]);

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            const response = await fetch(
                "/api/book-event",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        eventId,
                        email,
                        slug,
                    }),
                }
            );

            if (response.status === 409) {

                alert(
                    "You have already registered for this event."
                );

                return;
            }

            if (response.ok) {

                setSubmitted(true);

                setPeople((prev) => prev + 1);

                return;
            }

            alert("Booking failed");

        } catch (error) {

            return error;
        }
    };

    return (
       <aside className="booking">

            <div className="signup-card">

                <h2>Book Your Spot</h2>

                {!submitted && (
                    <>
                        {people > 0 ? (
                            <p className="text-sm">
                                Join {people}{" "}
                                {people === 1
                                    ? "person"
                                    : "people"}{" "}
                                who have already booked
                                their spot!
                            </p>
                        ) : (
                            <p className="text-sm">
                                Be the first to book
                                your spot!
                            </p>
                        )}
                    </>
                )}

                <div id="book-event">

                    {submitted ? (

                        <p className="text-sm">
                            Thank you for signing up.
                        </p>

                    ) : (

                        <form onSubmit={handleSubmit}>

                            <div>

                                <label htmlFor="email">
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    placeholder="Enter your email address"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>

                            <button
                                type="submit"
                                className="button-submit"
                            >
                                Submit
                            </button>

                        </form>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default BookingsForm;