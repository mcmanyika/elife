import { BsFacebook } from "react-icons/bs";
import { FaTwitter, FaLinkedin } from "react-icons/fa";

function Person({ name, role }) {
  return (
    <div className='bg-gray-50 p-4 rounded'>
      <p className='text-xl font-bold text-center text-gray-600 mb-2'>{name}</p>
      <div className="flex justify-center">
        <BsFacebook size={18} className="text-gray-400 mx-2" aria-label="Facebook" />
        <FaTwitter size={18} className="text-gray-400 mx-2" aria-label="Twitter" />
        <FaLinkedin size={18} className="text-gray-400 mx-2" aria-label="LinkedIn" />
      </div>
      {/* <p className='text-gray-400 text-center mt-2'>{role}</p> */}
    </div>
  );
}

function States() {
  const team = [
    { name: 'Tumaini', role: 'Michigan' },
    { name: 'Gary', role: 'Califonia' },
    { name: 'Michael', role: 'Illinois' },
    { name: 'Munashe', role: 'New York' },
  ];

  const location = [
    { name: 'Michigan' },
    { name: 'Dallas, TX' },
    { name: 'New York' },
    { name: 'Illinois' },
    { name: 'Califonia' },
    { name: 'Chicago' },
    { name: 'New Hamshire' },
    { name: 'Kentucky' },
  ];

  return (
    <div className='max-w-5xl mx-auto pb-10'>
        <p className="text-lg font-thin pt-5 pb-5">Sponsered Features</p>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
          {team.map((person, index) => (
            <Person key={index} name={person.name} role={person.role} />
          ))}
        </div>
    </div>
  );
}

export default States;
