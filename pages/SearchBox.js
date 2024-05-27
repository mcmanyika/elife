import React from 'react';

export default function SearchBox({ setSearchTerm }) {
    return (
        <div className="p-20">

<div className='text-center font-light text-xs pt-3'>Connect with an Agent</div>
            <input
                type="text"
                placeholder="Search Agent by First or Last Name..."
                className="p-2 border border-gray-300 rounded w-full"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}
