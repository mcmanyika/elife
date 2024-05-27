'use client'
import { useState, useEffect, useRef } from 'react';
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
    const [agentsPerPage] = useState(10); // Change this number according to your preference
    const [searchTerm, setSearchTerm] = useState('');
    const scrollContainerRef = useRef(null);

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
        <div className='w-full bg-white'>
            <div className='w-full bg-slate-300'>
                <div className='max-w-5xl mx-auto pt-15'>
                    <SearchBox setSearchTerm={setSearchTerm} />
                </div>
            </div>
            <div className='mx-auto'>
                <Ad />
                <p className="text-xs text-center font-thin p-5">Featured Insurance Agents</p>
                <div className='relative w-full'>
                    <button 
                        onClick={scrollLeft} 
                        className='absolute left-3 top-1/2 transform -translate-y-1/2 z-10 text-7xl text-gray-200'
                    >
                        &#8249;
                    </button>
                    <div 
                        ref={scrollContainerRef} 
                        className='flex overflow-x-scroll overflow-y-hidden whitespace-nowrap py-3 example scroll-smooth'
                    >
                        {currentAgents.map((agent, index) => (
                            <div key={index} className='inline-block  p-4 rounded mr-4'>
                                <AgentCard 
                                    fname={agent.fname} 
                                    lname={agent.lname} 
                                    image={agent.image} 
                                    phone={agent.phone} 
                                    linkedin={agent.linkedin} 
                                />
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={scrollRight} 
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 z-10 text-7xl text-gray-200'
                    >
                        &#8250;
                    </button>
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

function AgentCard({ fname, lname, image, phone, linkedin }) {
    return (
        <div className='flex flex-col md:flex-row p-4 rounded m-2'>
            {image ? (
                <div className='md:block w-full md:w-1/4'>
                    <div className="relative w-20 h-20 rounded-full overflow-hidden">
                        <Image src={image} alt="Person" layout="fill" objectFit="cover" />
                    </div>
                </div>
            ) : null}
            <div className='w-full md:w-2/4'>
                <div className='text-sm font-light text-gray-500 mb-2'>{fname} {lname}</div>
                <div className="flex">
                    <a href={linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={18} className="text-gray-400 mx-2" aria-label="LinkedIn" />
                    </a>
                </div>
            </div>
            <div className='w-full md:w-1/4 flex items-center'>
                <a href={`https://web.whatsapp.com/send?phone=${phone}`} target="_blank" rel="noopener noreferrer"
                   className="bg-gray-600 text-white text-center text-xs p-1 m-2 rounded">
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
