'use client'
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebaseConfig';
import { BsFacebook } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import Image from 'next/image';
import SearchBox from './SearchBox'; // Adjust the path as necessary
import Ad from '../src/app/components/Ad'

export default function AllAgents() {
    const [agents, setAgents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [agentsPerPage] = useState(4); // Change this number according to your preference
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const agencyRef = ref(database, 'agency');
        onValue(agencyRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const agentsArray = Object.values(data);
                setAgents(agentsArray);
            } else {
                setAgents([]);
            }
        });
    }, []);

    // Filter agents based on the search term
    const filteredAgents = agents.filter(agent =>
        agent.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.lname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination Logic
    const indexOfLastAgent = currentPage * agentsPerPage;
    const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
    const currentAgents = filteredAgents.slice(indexOfFirstAgent, indexOfLastAgent);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className='w-full bg-white'>
            <div className='w-full bg-slate-300'>
                <div className='max-w-5xl mx-auto pt-20'>
                    <SearchBox setSearchTerm={setSearchTerm} />
                </div>
            </div>
            <div className='mx-auto pb-10'>
                <Ad />
                <p className=" text-sm text-center  font-thin p-5">Featured Agents</p>
                <div className='grid grid-cols-4 gap-2'>
                    {currentAgents.map((agent, index) => (
                        <div key={index}>
                            <AgentCard fname={agent.fname} lname={agent.lname} image={agent.image} phone={agent.phone} />
                        </div>
                    ))}
                </div>
                <Pagination
                    agentsPerPage={agentsPerPage}
                    totalAgents={filteredAgents.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
}

function AgentCard({ fname, lname, image, phone }) {
    return (
        <div className='flex p-4 rounded m-2'>
            {image ? (
                <div className='hidden md:block w-full md:w-1/4'>
                    <div className="relative w-20 h-20 rounded-full overflow-hidden">
                        <Image src={image} alt="Person" layout="fill" objectFit="cover" />
                    </div>
                </div>
            ) : null}

            <div className='w-full md:w-2/4'>
                <div className=' text-gray-500 mb-2'>{fname} {lname}</div>
                <div className="flex">
                    {/* <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <BsFacebook size={18} className="text-gray-400 mx-2" aria-label="Facebook" />
                    </a> */}
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={18} className="text-gray-400 mx-2" aria-label="LinkedIn" />
                    </a>
                </div>
            </div>
            <div className='w-full md:w-1/4 flex items-center justify-end'>
            <a href={`https://web.whatsapp.com/send?phone=${phone}`} target="_blank" rel="noopener noreferrer"
            className="bg-gray-600 text-white text-center text-xs py-2 px-3 rounded">
                    WhatsApp Agent
                </a>
            </div>
        </div>
    );
}

function Pagination({ agentsPerPage, totalAgents, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalAgents / agentsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            {/* <ul className="pagination flex space-x-2 justify-center mt-4">
                {pageNumbers.map(number => (
                    <li key={number} className={currentPage === number ? 'page-item active' : 'page-item'}>
                        <button
                            onClick={() => paginate(number)}
                            className={`page-link px-3 py-1 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul> */}
        </nav>
    );
}
