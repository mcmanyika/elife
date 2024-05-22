import { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function AddEvent() {
    const [eventTitle, setEventTitle] = useState("");
    const [eventImage, setEventImage] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [hostName, setHostName] = useState("");
    const [hostPhone, setHostPhone] = useState("");
    const [zoomLink, setZoomLink] = useState("");

    const handleAddEvent = async () => {
        if (
            eventTitle.trim() === "" ||
            eventImage.trim() === "" ||
            eventDate.trim() === "" ||
            eventTime.trim() === "" ||
            hostName.trim() === "" ||
            hostPhone.trim() === "" ||
            zoomLink.trim() === ""
        ) {
            alert('All fields are required.');
            return;
        }

        try {
            const eventsRef = ref(database, 'events');
            const newEventRef = push(eventsRef);

            await set(newEventRef, {
                eventTitle,
                eventImage,
                eventDate,
                eventTime,
                hostName,
                hostPhone,
                zoomLink
            });

            setEventTitle("");
            setEventImage("");
            setEventDate("");
            setEventTime("");
            setHostName("");
            setHostPhone("");
            setZoomLink("");
            alert('Event added successfully');
        } catch (error) {
            console.error('Firebase Error:', error);
            alert('Failed to add event.');
        }
    };

    return (
        <main className='flex flex-col items-center'>
            <div className='mb-4 w-full max-w-xs'>
                <input 
                    type='text'
                    placeholder='Event Title'
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className='w-full border p-2 mb-2'
                />
                <input 
                    type='text'
                    placeholder='Image URL'
                    value={eventImage}
                    onChange={(e) => setEventImage(e.target.value)}
                    className='w-full border p-2 mb-2'
                />
                <input 
                    type='date'
                    placeholder='Event Date'
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className='w-full border p-2 mb-2'
                />
                <input 
                    type='time'
                    placeholder='Event Time'
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className='w-full border p-2 mb-2'
                />
                <input 
                    type='text'
                    placeholder='Host Name'
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    className='w-full border p-2 mb-2'
                />
                <input 
                    type='tel'
                    placeholder='Host Phone'
                    value={hostPhone}
                    onChange={(e) => setHostPhone(e.target.value)}
                    className='w-full border p-2 mb-2'
                />
                <input 
                    type='url'
                    placeholder='Zoom Link'
                    value={zoomLink}
                    onChange={(e) => setZoomLink(e.target.value)}
                    className='w-full border p-2 mb-2'
                />
            </div>
            <button 
                onClick={handleAddEvent} 
                className='bg-blue-500 text-white p-2 rounded w-full max-w-xs'
            >
                Add Event
            </button>
        </main>
    );
}
