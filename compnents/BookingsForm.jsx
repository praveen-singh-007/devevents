'use client'

import { useState } from "react";

const BookingsForm = () => {
    const people = 10;
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        setTimeout(() => {
            setSubmitted(true);
        },1000);
    }
    return(
            <aside class="booking">
                <div class="signup-card">
                    <h2>Book Your Spot</h2>
                    {people > 0 ? (
                        <p class="text-sm">Join {people} people who have already booked their spot!</p>
                    ) : (   
                        <p class="text-sm">Be the first to book your spot!</p>
                    )}

                        <div id="book-event">
                            {submitted ? (
                                <p className = 'text-sm'>Thank you for signing up.</p>
                            ):(
                                <form>
                                <div>
                                    <label htmlFor="email">Email Address</label>
                                    <input id="email" placeholder="Enter your email address" type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                                </div>
                                <button type="submit" class="button-submit" onClick={handleSubmit}>Submit</button>
                            </form>


                            )}
                            
                        </div>
                    </div>
                </aside>
    )
}

export default BookingsForm;