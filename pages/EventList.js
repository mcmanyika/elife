'use client'
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebaseConfig';
import Image from 'next/image';


export default function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const eventsRef = ref(database, 'events');
        const unsubscribe = onValue(eventsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const parsedData = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                // Sort events by date in descending order
                parsedData.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
                setEvents(parsedData);

            } else {
                setEvents([]);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <main className='flex flex-col items-center'>
        {/* <h1 className='text-2xl text-gray-400  p-4'>Upcoming Events</h1> */}
        <ul className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-5 p-3 gap-4 w-full'>
            {events.slice(0,5).map(event => (
                <li key={event.id} className='border p-4 rounded'>
                    <div className='w-full h-96 mb-2 relative'>
                    <a href={`https://web.whatsapp.com/send?phone=${event.hostPhone}`} target="_blank" rel="noopener noreferrer">
                        <Image 
                            src={event.eventImage} 
                            alt={event.eventTitle} 
                            layout='fill' 
                            className='rounded' 
                        />
                        </a>
                    </div>
                    {/* <div className='text-sm text-gray-600'>
                        <p><strong>Date:</strong> {event.eventDate}</p>
                        <p><strong>Time:</strong> {event.eventTime}</p>
                        <p><strong>Host:</strong> {event.hostName}</p>
                        <p><strong>WhatsApp Number:</strong> <a href={`https://web.whatsapp.com/send?phone=${event.hostPhone}`} target="_blank" rel="noopener noreferrer">{event.hostPhone}</a></p>

                        <p><strong>Zoom Link:</strong> <a href={event.zoomLink} target="_blank" rel="noopener noreferrer">{event.zoomLink}</a></p>
                    </div> */}
                </li>
            ))}
        </ul>
    </main>
    );
}
