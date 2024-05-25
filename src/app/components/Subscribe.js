'use client'
import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { database } from '../../../firebaseConfig'; // Adjust the path to your actual Firebase config file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Subscribe() {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubscribe = async (event) => {
    event.preventDefault();

    if (mobileNumber.trim() === '') {
      toast.error('Mobile number is required.');
      return;
    }

    try {
      const subscribersRef = ref(database, 'subscribers');
      const newSubscriberRef = push(subscribersRef);

      await set(newSubscriberRef, {
        mobileNumber: mobileNumber,
        timestamp: new Date().toISOString()
      });

      setMobileNumber('');
      toast.success('Subscribed successfully');
    } catch (error) {
      console.error('Firebase Error:', error);
      toast.error('Failed to subscribe.');
    }
  };

  return (
    <div className='w-full bg-white p-4'>
      <div className='max-w-5xl mx-auto'>
        <div className='flex flex-col md:flex-row items-center'>
          <div className=' text-xl p-3 flex-1 uppercase'>
            Subscribe to Events Notifications
          </div>
          <form onSubmit={handleSubscribe} className='flex-1 flex items-center'>
            <input
              type='tel'
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder='Enter your mobile number'
              className='border rounded p-2 w-full md:w-64 lg:w-80'
              required
            />
            <button
              type='submit'
              className='bg-blue-500 text-white p-2 rounded ml-2'
            >
              Subscribe
            </button>
          </form>
        </div>
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
        theme="colored"
      />
    </div>
  );
}
