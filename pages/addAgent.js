import { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function AddAgent() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const handleAddData = async () => {
        if (fname.trim() === "" || lname.trim() === "") {
            alert('Both fields are required.');
            return;
        }

        try {
            const agencyRef = ref(database, 'agency');
            const newDataRef = push(agencyRef);

            await set(newDataRef, {
                fname: fname,
                lname: lname,
            });

            setFname("");
            setLname("");
            alert('Data added successfully');
        } catch (error) {
            console.error('Firebase Error:', error);
            alert('Failed to add data.');
        }
    };

    return (
        <main className='flex flex-col items-center'>
            <div className='mb-4 w-full max-w-xs'>
                <input 
                    type='text'
                    placeholder='First Name'
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    className='w-full border p-2 mb-2'
                />
                <input 
                    type='text'
                    placeholder='Last Name'
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    className='w-full border p-2'
                />
            </div>
            <button 
                onClick={handleAddData} 
                className='bg-blue-500 text-white p-2 rounded w-full max-w-xs'
            >
                Add Data
            </button>
        </main>
    );
}
