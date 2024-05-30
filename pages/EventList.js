'use client'
import { useState, useEffect, useRef } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebaseConfig';
import Image from 'next/image';

export default function EventList() {
    const [events, setEvents] = useState([]);
    const scrollContainerRef = useRef(null);

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

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div className='flex flex-col items-center pb-6'>
            <div className='relative w-full'>

            <div className='p-3 text-xs text-gray-500'>Life Insurence Living Benefits</div>
                <button 
                    onClick={scrollLeft} 
                    className='absolute left-0 top-1/2 transform -translate-y-1/2 p-4 z-10 text-7xl text-white'
                >
                    &#8249;
                </button>
                <div 
                    ref={scrollContainerRef} 
                    className='w-full overflow-x-scroll overflow-y-hidden whitespace-nowrap  example scroll-smooth'
                > 
                    {events.map(event => (
                        <div 
                            key={event.id} 
                            className='inline-block  p-2 rounded' 
                            style={{ minWidth: '300px' }}
                        >
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
                        </div>
                    ))}
                </div>
                <button 
                    onClick={scrollRight} 
                    className='absolute right-0 top-1/2 transform -translate-y-1/2 p-4 z-10 text-7xl text-white'
                >
                    &#8250;
                </button>
            </div>
        </div>
    );
}
