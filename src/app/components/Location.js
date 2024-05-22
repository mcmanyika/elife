import { BsFacebook } from "react-icons/bs";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import Link from 'next/link';

function Location({ name }) {
  return (
    <div className=' bg-slate-50 m-3 p-4 rounded'>
        <Link href={`/location/${encodeURIComponent(name)}`}>
            <p className='text-xl font-bold text-center text-gray-600 mb-2'>{name}</p>
        </Link>
    </div>
  );
}

function States() {
 
  const location = [
    { name: 'Atlanta' },
    { name: 'Austin' },
    { name: 'Baltimore' },
    { name: 'Charlotte' },
    { name: 'Michigan' },
    { name: 'Dallas, TX' },
    { name: 'New York' },
    { name: 'Illinois' },
    { name: 'Califonia' },
    { name: 'Chicago' },
    { name: 'New Hamshire' },
    { name: 'Kentucky' },
    { name: 'Miami' },
    { name: 'New Orleans' },
    { name: 'Orlando' },
  ];

  return (
    <div className='max-w-5xl mx-auto'>
        <p className="text-lg font-bold p-5">Find an Agent</p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-2 pb-32'>
        {location.map((location, index) => (
          <Location key={index} name={location.name} />
        ))}
      </div>
    </div>
  );
}

export default States;
