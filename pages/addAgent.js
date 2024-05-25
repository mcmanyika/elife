import { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { database } from '../firebaseConfig';
import Layout from '../src/app/components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddAgent() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const handleAddData = async () => {
        if (fname.trim() === "" || lname.trim() === "") {
            toast.error('Both fields are required.');
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
            toast.success("Data added successfully!");
        } catch (error) {
            console.error('Firebase Error:', error);
            toast.error('Failed to add data.');
        }
    };

    return (
        <Layout>
            <div className='flex flex-col items-center h-screen pt-52'>
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
            </div>
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
        </Layout>
    );
}
